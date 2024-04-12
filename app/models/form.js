const mongoose = require('mongoose');

// Define the schema
const formSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    phone_number: {
        type: String,
        required: true,
    },
    request: {
        type: String,
    },
    response: {
        type: String,
    }
}, { timestamps: true });

// Create the model from the schema
const Form = mongoose.model('forms', formSchema);

module.exports = Form;
