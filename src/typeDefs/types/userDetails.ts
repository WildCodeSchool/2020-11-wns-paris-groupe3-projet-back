import { gql } from "apollo-server-express";

export const userDetails = gql`
  type UserDetails {
    _id: ID!
    username: String!
    role: Role
    speciality: ID
    user: ID!
  }

  input InputUserDetails {
    username: String!
    role: ID!
    speciality: ID!
  }
`;
