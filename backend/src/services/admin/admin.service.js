const Admin = require('../../models/admin.model');
const baseService = require('../base/base.service');

const adminService = baseService(Admin);

adminService.findByEmail = (email) => Admin.findOne({ email });

module.exports = adminService;
