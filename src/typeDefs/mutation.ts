import { gql } from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    createUser(input: InputUser): User
    createClassroom(input: InputClassroom): Classroom
    createAssignation(input: InputTaskAssignation): TaskAssignation!
    createTask(input: InputTask): Task
    createRender(input: InputRender): Render
    createCorrection(input: InputCorrection): Correction
  }
`;
