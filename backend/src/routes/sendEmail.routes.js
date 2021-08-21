const express = require('express');
const emailSender = require('../utilities/EmailSender');

const router = express.Router();

router.post('/', (req, res, next) => emailSender.sendEmail(req, res, next));

module.exports = router;
