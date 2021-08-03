const Admin = require('../../models/admin.model');
const baseService = require('../base/base.service');

const adminService = baseService(Admin);

module.exports = adminService;
