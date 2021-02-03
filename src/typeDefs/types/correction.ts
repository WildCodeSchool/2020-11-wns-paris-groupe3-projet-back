import { gql } from "apollo-server-express";

export const correction = gql`
  type Correction {
    _id: ID!
    task: ID!
    creation_date: DateTime!
  }
`;
