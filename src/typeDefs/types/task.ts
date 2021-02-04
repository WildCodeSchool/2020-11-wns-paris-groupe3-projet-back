import { gql } from "apollo-server-express";

export const task = gql`
  type Task {
    _id: ID!
    taskname: String!
    url: String!
    creation_date: DateTime!
    #user: User
  }

  input InputTask {
    taskname: String!
    url: String!
    user: ID
  }
`;
