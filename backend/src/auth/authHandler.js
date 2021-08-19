const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const adminService = require('../services/admin/admin.service');
const sessionService = require('../services/session/session.service');

const saltRounds = 10;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  const admin = await adminService.findByEmail(email);

  if (!admin) {
    return next(new createError.BadRequest('Hibás email vagy jelszó!'));
  }

  bcrypt.compare(password, admin.password, async (err, result) => {
    if (err) {
      return next(new createError.InternalServerError('Error during password comparing!'));
    }

    try {
      if (result) {
        const accessToken = jwt.sign({ email: admin.email }, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: process.env.TOKEN_EXPIRY,
        });

        // Encrypt and save accessToken to database
        bcrypt.hash(accessToken, saltRounds, async (err, hash) => {
          if (err) {
            return next(new createError.InternalServerError('Error during token encrypting!'));
          }
          const sessionObjectInDatabase = await sessionService.create({ accessToken: hash });
          res.json({ _id: sessionObjectInDatabase._id, accessToken });
        });
      } else {
        return next(new createError.BadRequest('Hibás email vagy jelszó!'));
      }
    } catch {
      return next(new createError.BadRequest('Hibás email vagy jelszó!'));
    }
  });

};

const logout = async (req, res, next) => {
  const { sessionId, token } = req.body;

  if (!sessionId || !token) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  try {
    const sessionObjectInDatabase = await sessionService.findOne(sessionId);

    bcrypt.compare(token, sessionObjectInDatabase.accessToken, async (err, result) => {
      if (err) {
        return next(new createError.InternalServerError('Error during token comparing!'));
      }

      if (result) {
        await sessionService.delete(sessionObjectInDatabase._id);
        return res.json({})
      }
    });
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

module.exports = {
  login,
  logout
};
