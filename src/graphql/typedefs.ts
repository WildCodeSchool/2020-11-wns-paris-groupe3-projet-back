import { gql } from "apollo-server-express";
const { GraphQLDate } = require("graphql-iso-date");

// Définition des types qui correspondent aux collections de la base Mongo
// On peut récupérer des valeurs de champs grace aux input
// Définition des type Query qui permettent la lecture des données
// Définition des types mutation qui permettent la modification des données
const typeDefs = gql`
  scalar DateTime

  type User {
    _id: ID!
    username: String!
    role: ID!
    speciality: ID
  }

  type Task {
    _id: ID!
    taskname: String!
    creation_date: DateTime!
    user: [ID!]
  }

  type Role {
    _id: ID!
    role_name: String!
  }

  type Speciality {
    _id: ID!
    speciality_name: String!
  }

  type Group {
    _id: ID!
    groupname: String!
    user: [ID!]
  }

  type Class {
    _id: ID!
    classname: String!
    user: [ID!]
  }

  type User_details {
    _id: ID!
    firstname: String!
    lastname: String!
    email: String!
    user: ID!
  }

  type Task_assignation {
    _id: ID!
    task: ID!
    publication_date: DateTime!
    end_date: DateTime!
    affectedTo: [ID!]
  }

  type Render {
    _id: ID!
    user: [ID!]
    task: ID!
    creation_date: DateTime
  }

  type Comment {
    _id: ID!
    user: ID!
    task: ID!
    content: String!
    creation_date: DateTime!
  }

  type Authentication {
    _id: ID!
    password: String!
    salt: String!
    user: ID!
  }

  type Correction {
    _id: ID!
    task: ID!
    creation_date: DateTime!
  }

  type Grade {
    _id: ID!
    result: Float!
    task: ID!
    user: [ID!]
  }

  input InputUser {
    username: String!
    role: ID!
    speciality: ID
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
