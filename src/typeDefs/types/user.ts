import { gql } from "apollo-server-express";

export const user = gql`
  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    role: Role
    speciality: Speciality
  }

  input InputUser {
    username: String!
    role: ID!
    speciality: ID!
  }
`;
