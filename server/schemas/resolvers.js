const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Service, Cart, Booking } = require('../models'); // Import models in one line

const resolvers = {
  Query: {
    // View own account
    me: async (_, __, context) => {
      if (context.user) {
        try {
          console.log("User ID in context:", context.user._id);
          return await User.findById(context.user._id);
        } catch (error) {
          console.error('Error fetching user data:', error);
          throw new Error('Failed to fetch user data');
        }
      }
      throw new AuthenticationError('Not authenticated');
    },

    // Get all users
    users: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
      }
    },

    // Get all profiles
    profiles: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.error('Error fetching profiles:', error);
        throw new Error('Failed to fetch profiles');
      }
    },

    // Get all services
    services: async () => {
      try {
        return await Service.find();
      } catch (error) {
        console.error('Error fetching services:', error);
        throw new Error('Failed to fetch services');
      }
    },

    // Get bookings for a specific user
    bookings: async (_, { userId }) => {
      try {
        return await Booking.find({ user: userId });
      } catch (error) {
        console.error('Error fetching bookings:', error);
        throw new Error('Failed to fetch bookings');
      }
    },

    // Get user's cart with populated items
    getCart: async (_, { userId }) => {
      try {
        return await Cart.findOne({ user: userId }).populate('items.serviceId');
      } catch (error) {
        console.error('Error fetching cart:', error);
        throw new Error('Failed to fetch cart');
      }
    },
  },

  Mutation: {
    // Register a new user
    register: async (_, { firstName, lastName, username, email, password, pets }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ firstName, lastName, username, email, password: hashedPassword, pets });
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return { token, user };
      } catch (error) {
        console.error('Error during registration:', error);
        throw new Error('Registration failed');
      }
    },

    // Log in a user
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return { 
          token, 
          user: {
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        };
      } catch (error) {
        console.error('Login error:', error.message);
        throw new Error('Login failed');
      }
    },

    // Add a service to the user's cart
    addToCart: async (_, { userId, serviceId, quantity }) => {
      try {
        const cart = await Cart.findOneAndUpdate(
          { user: userId },
          { $addToSet: { items: { serviceId, quantity } } },
          { new: true, upsert: true }
        );
        return cart;
      } catch (error) {
        console.error('Error adding to cart:', error);
        throw new Error('Failed to add item to cart');
      }
    },

    // Update the quantity of an item in the cart
    updateCartItem: async (_, { userId, serviceId, quantity }) => {
      try {
        const cart = await Cart.findOneAndUpdate(
          { user: userId, 'items.serviceId': serviceId },
          { $set: { 'items.$.quantity': quantity } },
          { new: true }
        );
        return cart;
      } catch (error) {
        console.error('Error updating cart item:', error);
        throw new Error('Failed to update cart item');
      }
    },

    // Remove an item from the cart
    removeFromCart: async (_, { userId, serviceId }) => {
      try {
        const cart = await Cart.findOneAndUpdate(
          { user: userId },
          { $pull: { items: { serviceId } } },
          { new: true }
        );
        return cart;
      } catch (error) {
        console.error('Error removing from cart:', error);
        throw new Error('Failed to remove item from cart');
      }
    },
    
    // Book services for a user
    bookServices: async (_, { userId, serviceIds }) => {
        try {
          // Fetch the services by their IDs
          const services = await Service.find({ _id: { $in: serviceIds } });
          
          // Create a new booking with the services for the user
          const newBooking = await Booking.create({
            user: userId,
            services: serviceIds,
            status: 'pending',
          });
  
          // Populate user and services fields in the booking response
          const populatedBooking = await Booking.findById(newBooking._id)
            .populate('user')
            .populate('services');
  
          return populatedBooking;
        } catch (error) {
          console.error('Error booking services:', error);
          throw new Error('Failed to book services');
        }
      },
  
      // Remove a service from a booking
      removeServiceFromBooking: async (_, { bookingId, serviceId }) => {
        try {
          // Update the booking by pulling the service from the services array
          const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { $pull: { services: serviceId } },
            { new: true }
          ).populate('services');
  
          if (!updatedBooking) {
            throw new Error('Booking not found');
          }
  
          return updatedBooking;
        } catch (error) {
          console.error('Error removing service from booking:', error);
          throw new Error('Failed to remove service from booking');
        }
      },
  
      // Cancel a booking
      cancelBooking: async (_, { bookingId }) => {
        try {
          // Update the booking status to 'cancelled' and set refundIssued if applicable
          const canceledBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { status: 'cancelled', refundIssued: true },
            { new: true }
          );
  
          if (!canceledBooking) {
            throw new Error('Booking not found');
          }
  
          return canceledBooking;
        } catch (error) {
          console.error('Error canceling booking:', error);
          throw new Error('Failed to cancel booking');
        }
      },
    },
  };
  
  module.exports = resolvers;