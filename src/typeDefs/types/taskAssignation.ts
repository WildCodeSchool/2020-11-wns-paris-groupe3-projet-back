import { gql } from "apollo-server-express";

export const taskAssignation = gql`
  type TaskAssignation {
    _id: ID!
    task: ID!
    classroom: ID!
    # publication_date: DateTime
    # end_date: DateTime
    # affectedTo: [ID!]
  }

  input InputTaskAssignation {
    task: ID
    classroom: ID
  }
`;
