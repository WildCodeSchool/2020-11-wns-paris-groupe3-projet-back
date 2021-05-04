import { gql } from "apollo-server-express";

export const classroom = gql`
  type Classroom {
    _id: ID!
    classname: String!
    users: [User]
  }

  input InputClassroom {
    classname: String!
    users: [ID]
  }
`;
