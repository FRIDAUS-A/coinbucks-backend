const express = require('express');
const { 
    convertCryptoToNaira, 
    getAllTransactions, 
    getTransactionById,
} = require('../controllers/transaction.controller');
const { auditMiddleware } = require('../middleware/audit.middlware');

const transactionRouter = express.Router();

transactionRouter.route('/transactions/to-naira').post(auditMiddleware, convertCryptoToNaira);
transactionRouter.route('/transactions').get(auditMiddleware, getAllTransactions);
transactionRouter.route('/transactions/:transactionId').get(auditMiddleware, getTransactionById);


module.exports = {
    transactionRouter,
} 