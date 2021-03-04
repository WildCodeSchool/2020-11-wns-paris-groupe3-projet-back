import { gql } from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    register(input: InputRegister!): UserDetails!
    login(email: String!, password: String!): UserDetails!
    createClassroom(input: InputClassroom): Classroom
    createAssignation(input: InputTaskAssignation): TaskAssignation!
    createTask(input: InputTask): Task
    createRender(input: InputRender): Render
    createCorrection(input: InputCorrection): Correction
  }
`;
