import { gql } from "apollo-server-express";

export const grade = gql`
  type Grade {
    _id: ID!
    result: Float!
    task: ID!
    user: [ID!]
  }
`;
