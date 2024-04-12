const mongoose = require( 'mongoose' );

// Define the schema
const formAttributeSchema = new mongoose.Schema( {
    attribute_id: {
        type: String,
        required: true,
    },
    form_id: {
        type: String,
        required: true,
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
    },
}, { timestamps: true } );

const formAttribute = mongoose.model( 'form_attributes', formAttributeSchema );

module.exports = formAttribute;
