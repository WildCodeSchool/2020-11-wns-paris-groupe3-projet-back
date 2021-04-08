import { gql } from "apollo-server-express";

export const speciality = gql`
  type Speciality {
    _id: ID!
    speciality_name: String!
  }
`;
