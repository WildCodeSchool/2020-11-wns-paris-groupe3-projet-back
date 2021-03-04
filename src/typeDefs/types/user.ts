import { gql } from "apollo-server-express";

export const user = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    token: String!
    role: Role
    speciality: Speciality
    creation_date: DateTime!
  }

  input InputRegister {
    firstname: String!
    lastname: String!
    email: String!
    password: String!
    confirmPassword: String!
    role: ID
    speciality: ID
  }

  input InputLogin {
    email: String!
    password: String!
  }
`;
