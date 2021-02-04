import { gql } from "apollo-server-express";

export const taskAssignation = gql`
  type Task_assignation {
    _id: ID!
    task: ID!
    publication_date: DateTime!
    end_date: DateTime!
    affectedTo: [ID!]
  }
`;
