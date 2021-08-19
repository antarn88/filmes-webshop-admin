const Session = require('../../models/session.model');
const baseService = require('../base/base.service');

const sessionService = baseService(Session);

module.exports = sessionService;
