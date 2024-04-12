const Joi = require('joi');
const Attribute = require('../../models/attribute');
const AttributeTypes = require('../../enums/attributes/attributeTypes');

const storeFormAttributeSchema = Joi.object( {
    attribute_id: Joi.string().required(),
    form_id: Joi.string().required(),
    value: Joi.required(),
} );

async function storeFormAttributeSchemaValueType( attributeId )
{
    const attribute = await Attribute.findById(attributeId);

    if ( !attribute )
    {
        throw new Error( 'Attribute not found' );
    }

    let valueValidationSchema;

    switch ( attribute.type )
    {
        case AttributeTypes.STRING:
            valueValidationSchema = Joi.string();
            break;
        case AttributeTypes.NUMBER:
            valueValidationSchema = Joi.number();
            break;
        case AttributeTypes.BOOLEAN:
            valueValidationSchema = Joi.boolean();
            break;
        case AttributeTypes.DATE:
            valueValidationSchema = Joi.date();
            break;
        case AttributeTypes.ARRAY:
            valueValidationSchema = Joi.array();
            break;
        default:
            throw new Error( 'Unsupported attribute type') ;
    }

    return Joi.object( {
        value: valueValidationSchema,
    } )
}

module.exports = {storeFormAttributeSchema, storeFormAttributeSchemaValueType};
