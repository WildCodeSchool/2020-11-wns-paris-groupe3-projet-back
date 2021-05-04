import { gql } from "apollo-server-express";

export const taskAssignation = gql`
  type TaskAssignation {
    _id: ID!
    task: Task
    end_date: DateTime
    affectedTo: Classroom
  }

  input InputTaskAssignation {
    task: ID
    end_date: DateTime
    affectedTo: ID
  }
`;
