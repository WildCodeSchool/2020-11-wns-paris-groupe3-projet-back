"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
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
exports.default = typeDefs;
//# sourceMappingURL=typedefs.js.map