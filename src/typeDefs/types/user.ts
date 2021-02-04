import { gql } from "apollo-server-express";

export const user = gql`
  type User {
    _id: ID!
    username: String!
    role: Role
    speciality: ID
  }

  input InputUser {
    username: String!
    role: ID!
    speciality: ID!
  }
`;
