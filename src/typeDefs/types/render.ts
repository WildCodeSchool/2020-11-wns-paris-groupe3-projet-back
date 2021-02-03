import { gql } from "apollo-server-express";

export const render = gql`
  type Render {
    _id: ID!
    user: [ID!]
    task: ID!
    creation_date: DateTime
  }
`;
