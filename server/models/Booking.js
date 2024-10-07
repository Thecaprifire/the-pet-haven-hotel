const { Schema, model } = require('mongoose');

const BookingSchema = new Schema({
    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true, });


const Booking = model('Booking', BookingSchema);

module.exports = Booking;
