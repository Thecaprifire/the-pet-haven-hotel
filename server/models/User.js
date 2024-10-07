const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const PetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Pet name is required'],
    },
    gender: {
        type: String,
        required: [true, 'Pet gender is required'],
        enum: ['male', 'female', 'Male', 'Female'],
    },
    age: {
        type: Number,
        required: [true, 'Pet age is required'],
        min: [0, 'Age must be a non-negative number'], // Ensure age is a non-negative number
    },
    breed: {
        type: String,
        required: [true, 'Pet breed is required'],
    },
    notes: {
        type: String,
        required: [true, 'Pet notes are required'],
    },
});

// Define the User schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please include a valid email address'],
        unique: true,
        lowercase: true, // Normalize email case
        trim: true, // Remove whitespace
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email address.`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
    },
    booking: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking',
        },
    ],
    pets: [PetSchema], // Include pets in the User model
});

// Set up pre-save middleware to create password hash
userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

// Compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
module.exports = User;