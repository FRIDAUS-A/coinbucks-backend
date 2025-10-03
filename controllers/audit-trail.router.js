const { AuditTrail } = require("../model")
const { StatusCodes } = require('http-status-codes');


const getAuditTrails = async (req, res) => {
    const auditTrails = await AuditTrail
        .query()
        .orderBy('operationTime', 'desc');

    res.status(StatusCodes.OK).json({
        status: 'success',
        auditTrails,
    })
}


module.exports = {
    getAuditTrails,
}