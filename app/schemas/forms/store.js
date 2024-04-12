const Joi = require('joi');

const storeFormSchema = Joi.object({
    username: Joi.string(),
    phone_number: Joi.string().required(),
});

module.exports = storeFormSchema;