/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const deliveryService = require('../../services/delivery/delivery.service');

exports.findAll = async (_req, res) => {
  const deliveries = await deliveryService.findAll();
  res.json(deliveries);
  return deliveries;
};

exports.findOne = async (req, res, next) => {
  try {
    const delivery = await deliveryService.findOne(req.params.id);
    if (!delivery) {
      return next(new createError.NotFound('Delivery is not found!'));
    }
    res.json(delivery);
    return delivery;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.create = async (req, res, next) => {
  const {
    customer, products, note, order,
  } = req.body;

  if (!customer || !products || !note || !order) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  const newDeliveryFromReqBody = {
    customer, products, note, order,
  };

  const newDeliveryFromDatabase = await deliveryService.create(newDeliveryFromReqBody);
  res.status(201);
  res.json(newDeliveryFromDatabase);
  return newDeliveryFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    customer, products, note, order,
  } = req.body;

  try {
    const oldData = await deliveryService.findOne(id);

    if (!oldData) {
      return next(new createError.NotFound('Delivery is not found!'));
    }

    const updatedData = {
      _id: id,
      customer: customer === undefined ? oldData.customer : customer,
      order: order === undefined ? oldData.order : order,
      products: products === undefined ? oldData.products : products,
      note: note === undefined ? oldData.note : note,
    };

    const updatedEntity = await deliveryService.update(updatedData._id, updatedData);
    res.json(updatedEntity);
    return updatedEntity;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedDelivery = await deliveryService.delete(req.params.id);
    if (!deletedDelivery) {
      return next(new createError.NotFound('Delivery is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json({});
  return {};
};

exports.deleteByOrderId = async (req, res, next) => {
  const { orderId } = req.params;

  try {
    const deletedDelivery = await deliveryService.deleteByOrderId(orderId);
    if (!deletedDelivery) {
      return next(new createError.NotFound('Delivery is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
  res.json({});
  return {};
};
