const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminService = require('../services/admin/admin.service');

const tokens = [];

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  const admin = await adminService.findByEmail(email);

  if (!admin) {
    return next(new createError.BadRequest('Hibás email vagy jelszó!'));
  }

  bcrypt.compare(password, admin.password, (err, result) => {
    if (err) {
      return next(new createError.InternalServerError('Error during password comparing!'));
    }

    if (result) {
      const accessToken = jwt.sign({ email: admin.email }, process.env.ACCESS_TOKEN_SECRET);
      tokens.push(accessToken);
      return res.json({ accessToken });
    }

    return next(new createError.BadRequest('Hibás email vagy jelszó!'));
  });

  return false;
};

const logout = (req, res) => {
  const { token } = req.body;

  if (!tokens.includes(token)) {
    res.sendStatus(403);
  }

  const tokenIndex = tokens.indexOf(token);
  tokens.splice(tokenIndex, 1);

  return res.json('OK');
};

module.exports = {
  login,
  logout,
  tokens,
};
