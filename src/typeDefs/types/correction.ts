import { gql } from "apollo-server-express";

export const correction = gql`
  type Correction {
    _id: ID!
    task: ID!
    url: String!
    user: ID!
    creation_date: DateTime!
  }

  input InputCorrection {
    user: ID!
    task: ID!
    url: String!
  }
`;
