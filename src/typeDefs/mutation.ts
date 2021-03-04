import { gql } from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    createUser(input: InputUser): User
    createClassroom(input: InputClassroom): Classroom
    createAssignation(input: InputTaskAssignation): TaskAssignation!
    createTask(input: InputTask): Task
    createComment(input: InputComment): Comment
    updateComment(_id: ID!, input: UpdateComment): Comment
    deleteComment(_id: ID!): Comment
    createRender(input: InputRender): Render
    createCorrection(input: InputCorrection): Correction
  }
`;
