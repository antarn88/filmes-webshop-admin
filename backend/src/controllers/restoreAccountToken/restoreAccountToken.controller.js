const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const restoreAccountTokenService = require('../../services/restoreAccountToken/restoreAccountToken.service');
const EmailSender = require('../../utilities/EmailSender');

const saltRounds = 10;

exports.findByEmail = async (req, res, next) => {
  const { email } = req.query;
  const tokenObjects = await restoreAccountTokenService.findByEmail(email);
  return res.json(tokenObjects);
};

exports.findLastTokenObjectByEmail = async (req, res, next) => {
  const lastTokenObject = await restoreAccountTokenService.findLastTokenByEmail(req.query.email);
  res.json(lastTokenObject);
  return lastTokenObject;
};

exports.create = async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return next(new createError.BadRequest('Missing email!'));
  }

  const unencryptedToken = jwt.sign({ email }, process.env.RESTORE_TOKEN_SECRET, {
    expiresIn: process.env.RESTORE_TOKEN_EXPIRY,
  });

  try {
    bcrypt.hash(unencryptedToken, saltRounds, async function (err, hash) {
      if (err) {
        return next(new createError.InternalServerError(err.message));
      }

      const restoreAccountToken = await restoreAccountTokenService.create({ email, token: hash });
      res.json(restoreAccountToken);
      const emailText = `
      <h2>Üdvözlünk!</h2>

      <h4>A Filmes Webshop admin oldalán jelszóhelyreállítást kezdeményeztél.<br>
      Új jelszó beállításához kattints az alábbi linkre:</h4>

      <p>http://localhost:3000/restoreAccount/check?email=${email}&token=${unencryptedToken}</p>
      
      <h4>Amennyiben nem te kezdeményezted a kérést, úgy kérlek hagyd figyelmen kívül ezt az üzenetet!</h4>

      <p>Üdvözlettel:<br>
      Filmes Webshop rendszere.</p>
      <hr>
      <small>Ez egy automata üzenet, kérlek ne válaszolj rá!</small>
      `;
      const emailSender = new EmailSender(email, 'Elfelejtett jelszó', emailText);
      emailSender.send();

    });
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.deleteAllRequestByEmail = async (req, res, next) => {
  const { email } = req.query;

  if (!email) {
    return next(new createError.BadRequest('Missing email!'));
  }

  const tokenObjects = await restoreAccountTokenService.findByEmail(email);
  if (!tokenObjects) {
    return next(new createError.NotFound('Token object is not found!'));
  }

  try {
    await restoreAccountTokenService.deleteAllRequestByEmail(email);
    return res.json({});
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};
