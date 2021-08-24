const RestoreAccountToken = require('../../models/restoreAccountToken.model');
const baseService = require('../base/base.service');

const restoreAccountTokenService = baseService(RestoreAccountToken);

restoreAccountTokenService.findByEmail = (email) => RestoreAccountToken.find({ email });
restoreAccountTokenService.findLastTokenByEmail = (email) => RestoreAccountToken.findOne({ email }).sort({ createdAt: -1 }).limit(1);
restoreAccountTokenService.deleteAllRequestByEmail = (email) => RestoreAccountToken.deleteMany({ email });

module.exports = restoreAccountTokenService;
