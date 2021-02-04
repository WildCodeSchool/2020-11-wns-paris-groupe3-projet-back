import { gql } from "apollo-server-express";

export const authentication = gql`
  type Authentication {
    _id: ID!
    password: String!
    salt: String!
    user: ID!
  }
`;
