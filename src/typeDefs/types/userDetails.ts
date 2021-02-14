import { gql } from "apollo-server-express";

export const userDetails = gql`
  type UserDetails {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    token: String!
    creation_date: DateTime!
  }

  input InputRegister {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input InputLogin {
    email: String!
    password: String!
  }
`;
