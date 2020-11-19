import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    name: String
  }

  type Task {
    _id: ID
    title: String!
    start: String!
    end: String!
  }

  input InputTask {
    title: String!
    start: String!
    end: String!
  }

  type Query {
    hello: String
    getUsers: [User]
    allTasks: [Task]
  }

  type Mutation {
    createTask(input: InputTask): Task
  }
`;

export default typeDefs;
