const { BadRequest, NotFound } = require("../errors");
const { Transaction } = require("../model");
const { cryptoToNairaValidation } = require("../validations");
const { v4: uuidv4 } = require('uuid');
const { StatusCodes } = require('http-status-codes');

// Dummy exchange rates
const exchangeRates = {
  BTC: 75000000, // 1 BTC = 75,000,000 NGN
  ETH: 5000000,  // 1 ETH = 5,000,000 NGN
  USDT: 1500     // 1 USDT = 1,500 NGN
};

const convertCryptoToNaira = async (req, res) => {
    const { error } = cryptoToNairaValidation(req.body);
    if (error) throw new BadRequest(error.message);
    const { cryptoType, amountInCrypto, recipientBank } = req.body;

    // rate
    const conversionRate = exchangeRates[cryptoType];
    const amountInNaira = conversionRate * amountInCrypto;

    const transaction = {
        transactionId: uuidv4(),
        cryptoType,
        amountInCrypto,
        recipientBank,
        conversionRate,
        amountInNaira,
        transactionAt: new Date().toISOString()
    }
    await Transaction
        .query()
        .insert(transaction);

    res.status(StatusCodes.CREATED).json({
        status: 'success',
        transaction,
    })
}

const getAllTransactions = async (req, res) => {
    const transactions = await Transaction
        .query()
        .orderBy('transactionAt','desc');

    res.status(StatusCodes.OK).json({
        status: 'success',
        transactions,
    })
}


const getTransactionById = async (req, res) => {
    const { transactionId } = req.params;
    const transaction = await Transaction
        .query()
        .where('transactionId', '=', transactionId)
        .first();
    if (!transaction) throw new NotFound('transaction not found');

    res.status(StatusCodes.OK).json({
        status: 'success',
        transaction,
    });
};


module.exports = {
    convertCryptoToNaira,
    getAllTransactions,
    getTransactionById,
}