/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const orderService = require('../../services/order/order.service');

exports.findAll = async (_req, res) => {
  const orders = await orderService.findAll();
  res.json(orders);
  return orders;
};

exports.findOne = async (req, res, next) => {
  try {
    const order = await orderService.findOne(req.params.id);
    if (!order) {
      return next(new createError.NotFound('Order is not found!'));
    }
    res.json(order);
    return order;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.create = async (req, res, next) => {
  const {
    customer, bill, products, note,
  } = req.body;

  if (!customer || !bill || !products || !note) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  const newOrderFromReqBody = {
    customer, bill, products, note,
  };

  const newOrderFromDatabase = await orderService.create(newOrderFromReqBody);
  res.status(201);
  res.json(newOrderFromDatabase);
  return newOrderFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    customer, bill, products, note,
  } = req.body;

  try {
    const oldData = await orderService.findOne(id);

    if (!oldData) {
      return next(new createError.NotFound('Order is not found!'));
    }

    const updatedData = {
      _id: id,
      customer: customer === undefined ? oldData.customer : customer,
      bill: bill === undefined ? oldData.bill : bill,
      products: products === undefined ? oldData.products : products,
      note: note === undefined ? oldData.note : note,
    };

    const updatedEntity = await orderService.update(updatedData._id, updatedData);
    res.json(updatedEntity);
    return updatedEntity;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedOrder = await orderService.delete(req.params.id);
    if (!deletedOrder) {
      return next(new createError.NotFound('Order is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json({});
  return {};
};
