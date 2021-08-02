/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const adminService = require('../../services/admin/admin.service');

exports.findAll = async (_req, res) => {
  const users = await adminService.findAll();
  res.json(users);
  return users;
};

exports.findOne = async (req, res, next) => {
  const user = await adminService.findOne(req.params.id);
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

  const newUserFromDatabase = await adminService.create(newUserFromReqBody);
  res.status(201);
  res.json(newUserFromDatabase);
  return newUserFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    email, password, role, active,
  } = req.body;

  const oldData = await adminService.findOne(id);

  if (!oldData) {
    return next(new createError.NotFound('Admin is not found!'));
  }

  const updatedData = {
    _id: id,
    email: email || oldData.email,
    password: password || oldData.password,
    role: role || oldData.role,
    active: active === undefined ? oldData.active : active,
  };

  let updatedEntity = {};

  try {
    updatedEntity = await adminService.update(updatedData._id, updatedData);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json(updatedEntity);
  return updatedEntity;
};

exports.delete = async (req, res, next) => {
  try {
    await adminService.delete(req.params.id);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json({});
  return {};
};
