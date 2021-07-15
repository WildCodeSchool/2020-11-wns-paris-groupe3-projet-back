import { gql } from "apollo-server-express";

export const comment = gql`
  type Comment {
    _id: ID!
    user: User!
    task: Task!
    content: String!
    creation_date: DateTime!
  }

  input InputComment {
    user: ID!
    task: ID!
    content: String!
  }

  input UpdateComment {
    content: String!
  }
`;
