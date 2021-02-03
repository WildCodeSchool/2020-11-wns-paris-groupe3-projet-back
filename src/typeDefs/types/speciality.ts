import { gql } from "apollo-server-express";

export const speciality = gql`
  type speciality {
    _id: ID!
    speciality_name: String!
  }
`;
