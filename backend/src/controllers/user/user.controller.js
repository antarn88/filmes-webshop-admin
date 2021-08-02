const createError = require('http-errors');
const userService = require('../../services/user/user.service');

exports.findAll = async (_req, res) => {
  const users = await userService.findAll();
  res.json(users);
  return users;
};

exports.findOne = async (req, res, next) => {
  const user = await userService.findOne(req.params.id);
  if (!user) {
    return next(new createError.NotFound('User is not found'));
  }
  res.json(user);
  return user;
};

exports.create = async (req, res, next) => {
  const {
    email, password, role, active,
  } = req.body;

  if (!email || !password || !role || !active) {
    return next(new createError.BadRequest('Missing properties!'));
  }
  const newUserFromReqBody = {
    email, password, role, active,
  };

  const newUserFromDatabase = await userService.create(newUserFromReqBody);
  res.status(201);
  res.json(newUserFromDatabase);
  return newUserFromDatabase;
};

exports.update = async (req, res, next) => {
  const {
    _id, email, password, role, active,
  } = req.body;

  if (!_id) {
    return next(new createError.BadRequest('Missing product ID!'));
  }

  const oldData = await userService.findOne(_id);

  const updatedData = {
    _id,
    email: email || oldData.email,
    password: password || oldData.password,
    role: role || oldData.role,
    active: active || oldData.active,
  };

  let updatedEntity = {};

  try {
    updatedEntity = await userService.update(updatedData);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json(updatedEntity);
  return updatedEntity;
};

exports.delete = async (req, res, next) => {
  try {
    await userService.delete(req.params.id);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json({});
  return {};
};
