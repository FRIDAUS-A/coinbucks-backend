const express = require('express');
const { getAuditTrails } = require('../controllers/audit-trail.router');


const auditRouter = express.Router()

auditRouter.route('/audit-trails').get(getAuditTrails);

module.exports = {
    auditRouter,
}