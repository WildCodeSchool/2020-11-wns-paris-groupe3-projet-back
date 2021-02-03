import { gql } from "apollo-server-express";

export const comment = gql`
  type Comment {
    _id: ID!
    user: ID!
    task: ID!
    content: String!
    creation_date: DateTime!
  }
`;
