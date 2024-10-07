const { gql } = require('apollo-server-express');

const typeDefs = gql`
   type User {
        _id: ID!
        username: String!
        firstName: String!
        lastName: String!
        email: String!
        bookings: [Booking]
        pets: [Pet]
    }

    type Auth {
        token: String!
        user: User!
    }

    type Service {
        _id: ID!
        name: String!
        price: Float!
        tier: String!
        description: String!
    }

    type Booking {
        _id: ID!
        user: User!
        services: [Service]
        bookingDate: String!
        status: String!
        refundIssued: Boolean!
    }

    type CartItem {
        serviceId: ID!
        quantity: Int!
    }

    type Cart {
        user: ID!
        items: [CartItem!]!
    }

    type Query {
        users: [User]
        profiles: [User]
        services: [Service]
        bookings(userId: ID!): [Booking]
        getUserByEmail(email: String!): User
        getCart(userId: ID!): Cart
        me: User
    }

    type Mutation {
        register(firstName: String!, lastName: String!, username: String!, email: String!, password: String!, pets: [PetInput!]!): Auth
        login(email: String!, password: String!): Auth
        bookServices(userId: ID!, serviceIds: [ID!]!): Booking
        removeServiceFromBooking(bookingId: ID!, serviceId: ID!): Booking
        cancelBooking(bookingId: ID!): Booking
        addToCart(userId: ID!, serviceId: ID!, quantity: Int!): Cart
        updateCartItem(userId: ID!, serviceId: ID!, quantity: Int!): Cart
        removeFromCart(userId: ID!, serviceId: ID!): Cart
    }

    type Pet {
        name: String!
        gender: String!
        age: Int!
        breed: String!
        notes: String!
    }

    input PetInput {
        name: String!
        gender: String!
        age: Int!
        breed: String!
        notes: String!
    }
`;

module.exports = typeDefs;