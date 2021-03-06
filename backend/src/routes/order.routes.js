const express = require('express');
const controller = require('../controllers/order/order.controller');

const router = express.Router();

// CREATE
router.post('/', (req, res, next) => controller.create(req, res, next));

// READ
router.get('/', (req, res) => controller.findAll(req, res));
router.get('/:id', (req, res, next) => controller.findOne(req, res, next));

// UPDATE
router.patch('/:id', (req, res, next) => controller.update(req, res, next));

// DELETE
router.delete('/:id', (req, res, next) => controller.delete(req, res, next));

module.exports = router;
