import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation register(
    $firstName: String!,
    $lastName: String!,
    $username: String!,
    $email: String!,
    $password: String!,
    $pets: [PetInput!]!
  ) {
    register(
      firstName: $firstName,
      lastName: $lastName,
      username: $username,
      email: $email,
      password: $password,
      pets: $pets
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const BOOK_SERVICES = gql`
  mutation bookServices(
    $userId: ID!,
    $serviceIds: [ID!]!,
    $date: String!,
    $time: String!,
    $petName: String!
  ) {
    bookServices(
      userId: $userId,
      serviceIds: $serviceIds,
      date: $date,
      time: $time,
      petName: $petName
    ) {
      _id
      user {
        _id
        username
      }
      services {
        _id
        name
        price
      }
      date
      time
      petName
    }
  }
`;

export const REMOVE_SERVICE_FROM_BOOKING = gql`
  mutation removeServiceFromBooking($bookingId: ID!, $serviceId: ID!) {
    removeServiceFromBooking(bookingId: $bookingId, serviceId: $serviceId) {
      _id
      services {
        _id
        name
        price
      }
    }
  }
`;

export const CANCEL_BOOKING = gql`
  mutation cancelBooking($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      _id
      status
      refundIssued
    }
  }
`;