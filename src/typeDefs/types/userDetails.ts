import { gql } from "apollo-server-express";

export const userDetails = gql`
  type User_details {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    user: ID!
  }
`;
