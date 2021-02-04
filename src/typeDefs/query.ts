import { gql } from "apollo-server-express";

export const query = gql`
  type Query {
    users: [User]
    userById(id: ID!): User
    tasks: [Task]
    taskById(id: ID!): Task
    allTasksByUser(id: ID!): [Task]
    roles: [Role]
    specialties: [speciality]
  }
`;
