import { gql } from "apollo-server-express";

export const group = gql`
  type Group {
    _id: ID!
    groupname: String!
    users: [ID!]
  }
`;
