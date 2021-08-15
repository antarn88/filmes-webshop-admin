/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const billService = require('../../services/bill/bill.service');

exports.findAll = async (_req, res) => {
  const bills = await billService.findAll();
  res.json(bills);
  return bills;
};

exports.findOne = async (req, res, next) => {
  const bill = await billService.findOne(req.params.id);
  if (!bill) {
    return next(new createError.NotFound('Bill is not found!'));
  }
  res.json(bill);
  return bill;
};

exports.create = async (req, res, next) => {
  const {
    customer, products, sum, paid,
  } = req.body;

  if (!customer || !products || !sum || paid === undefined) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  const newBillFromReqBody = {
    customer, products, sum, paid,
  };

  const newBillFromDatabase = await billService.create(newBillFromReqBody);
  res.status(201);
  res.json(newBillFromDatabase);
  return newBillFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    customer, products, sum, paid,
  } = req.body;

  const oldData = await billService.findOne(id);

  if (!oldData) {
    return next(new createError.NotFound('Bill is not found!'));
  }

  const updatedData = {
    _id: id,
    customer: customer === undefined ? oldData.customer : customer,
    products: products === undefined ? oldData.products : products,
    sum: sum === undefined ? oldData.sum : sum,
    paid: paid === undefined ? oldData.paid : paid,
  };

  let updatedEntity = {};

  try {
    updatedEntity = await billService.update(updatedData._id, updatedData);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json(updatedEntity);
  return updatedEntity;
};

exports.delete = async (req, res, next) => {
  try {
    const deletedBill = await billService.delete(req.params.id);

    if (!deletedBill) {
      return next(new createError.NotFound('Bill is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json({});
  return {};
};
