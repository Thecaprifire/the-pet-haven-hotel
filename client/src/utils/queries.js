import { gql } from '@apollo/client';

// Queries for fetching user data
export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_USER_DETAILS = gql`
  query UserDetails($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
      pets {
        name
        gender
        age
        breed
        notes
      }
    }
  }
`;

// Queries for fetching service data
export const GET_SERVICES = gql`
  query GetServices {
    services {
      _id
      name
      price
      tier
    }
  }
`;

export const QUERY_SERVICE_DETAILS = gql`
  query ServiceDetails($serviceId: ID!) {
    service(id: $serviceId) {
      _id
      name
      description
      options {
        duration
        cleanup
        price
      }
    }
  }
`;

// Queries for bookings
export const GET_BOOKINGS = gql`
  query GetBookings($userId: ID!) {
    bookings(userId: $userId) {
      _id  # Changed from id to _id
      user {
        _id  # Changed from id to _id
        username
      }
      services {
        _id  # Changed from id to _id
        name
        price
      }
      bookingDate
      status
    }
  }
`;

// New exports for cart management
export const GET_CART = gql`
  query GetCart {
    getCart {
      items {
        serviceId {
          _id
          name
          price
        }
        quantity
      }
    }
  }
`;

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($serviceId: ID!, $quantity: Int!) {
    updateCartItem(serviceId: $serviceId, quantity: $quantity) {
      items {
        serviceId {
          _id
          name
        }
        quantity
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($serviceId: ID!) {
    removeFromCart(serviceId: $serviceId) {
      items {
        serviceId {
          _id
          name
        }
        quantity
      }
    }
  }
`;