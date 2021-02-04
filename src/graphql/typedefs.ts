import { gql } from "apollo-server-express";

// Définition des types qui correspondent aux collections de la base Mongo
// On peut récupérer des valeurs de champs grace aux input
// Définition des type Query qui permettent la lecture des données
// Définition des types mutation qui permettent la modification des données
const typeDefs = gql`
  scalar DateTime

  type User {
    _id: ID!
    username: String!
    role: Role
    speciality: ID
  }

  type Task {
    _id: ID!
    taskname: String!
    creation_date: DateTime!
    users: [User]
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
    users: [ID!]
  }

  type Classroom {
    _id: ID!
    classname: String!
    users: [User]
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
    user: User!
    task: Task!
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
    speciality: ID!
  }

  input InputTask {
    taskname: String
    users: [ID]
  }

  input InputClassroom {
    classname: String!
    users: [ID]
  }

  input InputComment {
    user: ID!
    task: ID!
    content: String!
  }

  input UpdateComment {
    content: String!
  }

  type Query {
    userById(_id: ID!): User
    taskById(_id: ID!): Task
    users: [User]
    tasks: [Task]
    roles: [Role]
    specialities: [Speciality]
    allTasksByUser(_id: ID!): [Task]
  }

  type Mutation {
    createUser(input: InputUser): User
    createTask(input: InputTask): Task
    createClassroom(input: InputClassroom): Classroom
    createComment(input: InputComment): Comment
    updateComment(_id: ID!, input: UpdateComment): Comment
    deleteComment(_id: ID!): Comment
    tasks: [Task]
    roles: [Role]
    specialities: [Speciality]
    allTasksByUser(_id: ID!): [Task]
  }

  type Mutation {
    createUser(input: InputUser): User
    createTask(input: InputTask): Task
    createClassroom(input: InputClassroom): Classroom
    createComment(input: InputComment): Comment
    updateComment(_id: ID!, input: UpdateComment): Comment
    deleteComment(_id: ID!): Comment
  }
`;

export default typeDefs;
