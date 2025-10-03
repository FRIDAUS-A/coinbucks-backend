require('dotenv').config();
const { StatusCodes } = require('http-status-codes');
const { CustomError } = require('../errors');
const { sendErrorEmail } = require('../services/email.service');


const errorHandlerMiddleware = async (err, req, res, next) => {
	if (err instanceof CustomError ) {
		res.status(err.statusCode).json({
			message: err.message,
			status: 'failed',
		})
	} else {
        // await sendErrorEmail(err.message); // send error to the Developer
		return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
			message: err.message,
			status: 'failed',
		});
	}
}

module.exports = { errorHandlerMiddleware };
