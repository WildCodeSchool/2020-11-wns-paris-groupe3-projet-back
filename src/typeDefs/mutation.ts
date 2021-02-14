import { gql } from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    register(input: InputRegister!): User!
    login(email: String!, password: String!): User!
    createClassroom(input: InputClassroom): Classroom
    createTask(input: InputTask): Task
  }
`;
