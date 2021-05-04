import { gql } from "apollo-server-express";

export const role = gql`
  type Role {
    _id: ID!
    role_name: String!
  }
`;
