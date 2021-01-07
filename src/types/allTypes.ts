import mongodb from "mongodb";

export type UserType = {
  _id: mongodb.ObjectID;
  username: string;
  role: mongodb.ObjectID;
  speciality: mongodb.ObjectID;
};

export type UserDetailsType = {
  _id: mongodb.ObjectID;
  firstname: string;
  lastname: string;
  email: string;
  user: mongodb.ObjectID;
};

export type TaskType = {
  _id: mongodb.ObjectID;
  taskname: string;
  creation_date: number;
  users: Array<mongodb.ObjectID>;
};

export type TaskAssignation = {
  _id: mongodb.ObjectID;
  task: mongodb.ObjectID;
  publication_date: Date;
  end_date: Date;
  affectedTo: Array<mongodb.ObjectID>;
};

export type SpecialityType = {
  _id: mongodb.ObjectID;
  speciality_name: string;
};

export type RoleType = {
  _id: mongodb.ObjectID;
  role_name: string;
};

export type RenderType = {
  _id: mongodb.ObjectID;
  user: mongodb.ObjectID;
  task: mongodb.ObjectID;
  url: string;
  creation_date: number;
};

export type GroupType = {
  _id: mongodb.ObjectID;
  groupname: string;
  user: Array<mongodb.ObjectID>;
};

export type GradeType = {
  _id: mongodb.ObjectID;
  result: number;
  task: mongodb.ObjectID;
  user: Array<mongodb.ObjectID>;
};

export type CorrectionType = {
  _id: mongodb.ObjectID;
  task: mongodb.ObjectID;
  creation_date: Date;
};

export type CommentType = {
  _id: mongodb.ObjectID;
  user: mongodb.ObjectID;
  task: mongodb.ObjectID;
  content: string;
  creation_date: Date;
};

export type ClassroomType = {
  _id: mongodb.ObjectID;
  classname: string;
  users: Array<mongodb.ObjectID>;
};

export type AuthenticationType = {
  _id: mongodb.ObjectID;
  password: string;
  salt: string;
  user: mongodb.ObjectID;
};
