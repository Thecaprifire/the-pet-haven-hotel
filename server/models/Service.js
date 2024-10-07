const { Schema, model } = require('mongoose');

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    }
});

const Service = model('Service', serviceSchema);

module.exports = Service;