const express = require('express');
const controller = require('../controllers/admin/admin.controller');

const router = express.Router();

// CREATE
router.post('/', (req, res, next) => controller.login(req, res, next));

module.exports = router;
