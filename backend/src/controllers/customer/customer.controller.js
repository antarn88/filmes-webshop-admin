/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const customerService = require('../../services/customer/customer.service');

exports.findAll = async (_req, res) => {
  const customers = await customerService.findAll();
  res.json(customers);
  return customers;
};

exports.findOne = async (req, res, next) => {
  try {
    const customer = await customerService.findOne(req.params.id);
    if (!customer) {
      return next(new createError.NotFound('Customer is not found!'));
    }
    res.json(customer);
    return customer;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.create = async (req, res, next) => {
  const {
    firstName, lastName, email, address, active,
  } = req.body;

  if (!firstName || !lastName || !email || !address || active === undefined) {
    return next(new createError.BadRequest('Missing properties!'));
  }
  const newCustomerFromReqBody = {
    firstName, lastName, email, address, active,
  };

  const newCustomerFromDatabase = await customerService.create(newCustomerFromReqBody);
  res.status(201);
  res.json(newCustomerFromDatabase);
  return newCustomerFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    firstName, lastName, email, address, active,
  } = req.body;

  try {
    const oldData = await customerService.findOne(id);

    if (!oldData) {
      return next(new createError.NotFound('Customer is not found!'));
    }

    const updatedData = {
      _id: id,
      firstName: firstName || oldData.firstName,
      lastName: lastName || oldData.lastName,
      email: email || oldData.email,
      address: address || oldData.address,
      active: active === undefined ? oldData.active : active,
    };

    const updatedEntity = await customerService.update(updatedData._id, updatedData);
    res.json(updatedEntity);
    return updatedEntity;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedCustomer = await customerService.delete(req.params.id);

    if (!deletedCustomer) {
      return next(new createError.NotFound('Customer is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json({});
  return {};
};
