const { BadRequest } = require('./bad-request');
const { CustomError } = require('./custom-error');
const { NotFound } = require('./not-found');


module.exports = {
    BadRequest,
    NotFound,
    CustomError,
}