const mongoose = require( 'mongoose' );
const AttributeTypes = require('../enums/attributes/attributeTypes');
const AttributeModels = require('../enums/attributes/attributeModels');

const attributeSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        unique: true
    },
    persian_name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true,
        enum: Object.values( AttributeTypes ),
    },
    model: {
        type: String,
        required: true,
        enum: Object.values( AttributeModels ),
    },
    question: {
        type: String,
        required: true
    }
}, { timestamps: true } );

const attribute = mongoose.model( 'attributes', attributeSchema );

module.exports = attribute;
