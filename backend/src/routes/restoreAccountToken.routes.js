const express = require('express');
const controller = require('../controllers/restoreAccountToken/restoreAccountToken.controller');

const router = express.Router();

router.post('/', (req, res, next) => controller.create(req, res, next));
router.get('/lastToken', (req, res, next) => controller.findLastTokenObjectByEmail(req, res, next));
router.delete('/', (req, res, next) => controller.deleteAllRequestByEmail(req, res, next));

module.exports = router;
