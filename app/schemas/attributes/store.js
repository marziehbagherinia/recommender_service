const Joi = require('joi');

const acceptableTypes = ['String', 'Number', 'Boolean', 'Date', 'Array'];

const storeAttributeSchema = Joi.object( {
    name: Joi.string().required(),
    type: Joi.string().valid(...acceptableTypes).required(),
    model: Joi.string().required(),
    description: Joi.string().required(),
} );

module.exports = storeAttributeSchema;