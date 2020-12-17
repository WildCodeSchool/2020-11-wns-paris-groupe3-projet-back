import { gql } from "apollo-server-express";

const typeDefs = gql`
  type User {
    _id: ID!
    role_id: ID
    speciality_id: ID
  }

  type Task {
    _id: ID
    taskname: String
    creation_date: String
    user_id: ID
  }

  type Role {
    _id: ID
    role_name: String
  }

  type Speciality {
    _id: ID
    speciality_name: String
  }

  input InputUser {
    name: String!
  }

  input InputTask {
    taskname: String
    creation_date: String
  }

  type Query {
    hello: String
    users: [User]
    tasks: [Task]
    roles: [Role]
    specialities: [Speciality]
  }

  type Mutation {
    createUser(input: InputUser): User
    createTask(input: InputTask): Task
  }
`;

export default typeDefs;
