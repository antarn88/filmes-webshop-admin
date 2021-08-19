/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const bcrypt = require('bcrypt');

const adminService = require('../../services/admin/admin.service');

// For bcrypt
const saltRounds = 10;

exports.findAll = async (_req, res) => {
  const users = await adminService.findAll();
  res.json(users);
  return users;
};

exports.findOne = async (req, res, next) => {
  try {
    const user = await adminService.findOne(req.params.id);
    if (!user) {
      return next(new createError.NotFound('Admin is not found'));
    }
    res.json(user);
    return user;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.findByEmail = async (req, res, next) => {
  try {
    const admin = await adminService.findByEmail(req.params.email);
    if (!admin) {
      return next(new createError.NotFound('Admin is not found'));
    }
    res.json(admin);
    return admin;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.create = async (req, res, next) => {
  const {
    email, password, active,
  } = req.body;

  if (!email || !password || active === undefined) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  let newAdminFromDatabase;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return next(new createError.InternalServerError('Error during password encryption!'));
    }

    const newAdminFromReqBody = {
      email,
      password: hash,
      active,
    };

    newAdminFromDatabase = await adminService.create(newAdminFromReqBody);
    res.status(201);
    res.json(newAdminFromDatabase);
    return newAdminFromDatabase;
  });

  return newAdminFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    email, password, active,
  } = req.body;

  let oldData = null;
  let updatedEntity = {};

  try {
    oldData = await adminService.findOne(id);
    if (!oldData) {
      return next(new createError.NotFound('Admin is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      return next(new createError.InternalServerError('Error during password encryption!'));
    }

    const updatedData = {
      _id: id,
      email: email || oldData.email,
      password: hash || oldData.password,
      active: active === undefined ? oldData.active : active,
    };

    try {
      updatedEntity = await adminService.update(updatedData._id, updatedData);
      return res.json(updatedEntity);
    } catch (error) {
      return next(new createError.InternalServerError(error.message));
    }
  });
  return false;
};

exports.delete = async (req, res, next) => {
  try {
    const deletedAdmin = await adminService.delete(req.params.id);

    if (!deletedAdmin) {
      return next(new createError.NotFound('Admin is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json({});
  return {};
};
