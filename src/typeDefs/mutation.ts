import { gql } from "apollo-server-express";

export const mutation = gql`
  type Mutation {
    register(input: InputRegister!): UserDetails!
    login(email: String!, password: String!): UserDetails!
    createClassroom(input: InputClassroom): Classroom
    createTask(input: InputTask): Task
  }
`;
