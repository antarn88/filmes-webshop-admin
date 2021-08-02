/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const productService = require('../../services/product/product.service');

exports.findAll = async (_req, res) => {
  const products = await productService.findAll();
  res.json(products);
  return products;
};

exports.findOne = async (req, res, next) => {
  const product = await productService.findOne(req.params.id);
  if (!product) {
    return next(new createError.NotFound('Product is not found'));
  }
  res.json(product);
  return product;
};

exports.create = async (req, res, next) => {
  const {
    name, description, price, photo, active,
  } = req.body;

  if (!name || !description || !price || !photo || !active) {
    return next(new createError.BadRequest('Missing properties!'));
  }
  const newProductFromReqBody = {
    name, description, price: Number(price), photo, active,
  };

  const newProductFromDatabase = await productService.create(newProductFromReqBody);
  res.status(201);
  res.json(newProductFromDatabase);
  return newProductFromDatabase;
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    name, description, price, photo, active,
  } = req.body;

  const oldData = await productService.findOne(id);

  if (!oldData) {
    return next(new createError.NotFound('Product is not found!'));
  }

  const updatedData = {
    _id: id,
    name: name || oldData.name,
    description: description || oldData.description,
    price: Number(price) || oldData.price,
    photo: photo || oldData.photo,
    active: active === undefined ? oldData.active : active,
  };

  let updatedEntity = {};

  try {
    updatedEntity = await productService.update(updatedData._id, updatedData);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json(updatedEntity);
  return updatedEntity;
};

exports.delete = async (req, res, next) => {
  try {
    await productService.delete(req.params.id);
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json({});
  return {};
};
