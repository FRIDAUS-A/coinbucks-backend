const joi = require('joi');

const cryptoToNairaValidation = (data) => {
    const cryptoToNairaschema = joi.object({
        amountInCrypto: joi.number().positive().required(),
        cryptoType: joi.string().valid('BTC', 'ETH', 'USDT').required(),
        recipientBank: joi.string().required(),
    })


    return cryptoToNairaschema.validate(data);
}


module.exports = {
    cryptoToNairaValidation,
}