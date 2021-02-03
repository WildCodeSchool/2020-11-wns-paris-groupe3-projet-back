import { gql } from "apollo-server-express";

export const task = gql`
  type Task {
    _id: ID!
    taskname: String!
    creation_date: DateTime!
    users: [User]
  }

  input InputTask {
    taskname: String
    users: [ID]
  }
`;
