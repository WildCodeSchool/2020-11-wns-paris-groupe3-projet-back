import { gql } from "apollo-server-express";

export const render = gql`
  type Render {
    _id: ID!
    user: ID!
    task: ID!
    url: String
    creation_date: DateTime!
  }

  input InputRender {
    user: ID!
    task: ID!
    url: String!
  }
`;
