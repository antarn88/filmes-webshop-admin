/* eslint-disable no-underscore-dangle */
const createError = require('http-errors');
const productService = require('../../services/product/product.service');

exports.findAll = async (_req, res) => {
  const products = await productService.findAll();
  res.json(products);
  return products;
};

exports.findOne = async (req, res, next) => {
  try {
    const product = await productService.findOne(req.params.id);
    if (!product) {
      return next(new createError.NotFound('Product is not found'));
    }
    res.json(product);
    return product;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.create = async (req, res, next) => {
  const {
    name, description, price, photo, active,
  } = req.body;

  if (!name || !description || !price || !photo || active === undefined) {
    return next(new createError.BadRequest('Missing properties!'));
  }

  try {
    const newProductFromReqBody = {
      name, description, price: Number(price), photo, active,
    };

    const newProductFromDatabase = await productService.create(newProductFromReqBody);
    res.status(201);
    res.json(newProductFromDatabase);
    return newProductFromDatabase;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.update = async (req, res, next) => {
  const { id } = req.params;

  const {
    name, description, price, photo, active,
  } = req.body;

  try {
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

    const updatedEntity = await productService.update(updatedData._id, updatedData);
    res.json(updatedEntity);
    return updatedEntity;
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deletedProduct = await productService.delete(req.params.id);
    if (!deletedProduct) {
      return next(new createError.NotFound('Product is not found!'));
    }
  } catch (error) {
    return next(new createError.InternalServerError(error.message));
  }

  res.json({});
  return {};
};
