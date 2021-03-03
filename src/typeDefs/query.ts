import { gql } from "apollo-server-express";

export const query = gql`
  type Query {
    users: [User]
    user(_id: ID!): User
    tasks: [Task]
    taskById(id: ID!): Task
    allTasksByUser(id: ID!): [Task]
    roles: [Role]
    Specialties: [Speciality]
    classrooms: [Classroom]
    tasksAssignations: [TaskAssignation]
  }
`;
