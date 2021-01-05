import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export type UserType = {
  _id: mongodb.ObjectID;
  username: String;
  role: mongodb.ObjectID;
  speciality: mongodb.ObjectID;
};

export type UserDetailsType = {
  _id: mongodb.ObjectID;
  firstname: String;
  lastname: String;
  email: String;
  user: mongodb.ObjectID;
};

export type TaskType = {
  _id: mongodb.ObjectID;
  taskname: String;
  creation_date: Date;
  user: Array<mongodb.ObjectID>;
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
  speciality_name: String;
};

export type RoleType = {
  _id: mongodb.ObjectID;
  role_name: String;
};

export type RenderType = {
  _id: mongodb.ObjectID;
  user: mongodb.ObjectID;
  task: mongodb.ObjectID;
  creation_date: Date;
};

export type GroupType = {
  _id: mongodb.ObjectID;
  groupname: String;
  user: Array<mongodb.ObjectID>;
};

export type GradeType = {
  _id: mongodb.ObjectID;
  result: Number;
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
  content: String;
  creation_date: Date;
};

export type ClassroomType = {
  _id: mongodb.ObjectID;
  classname: String;
  user: Array<mongodb.ObjectID>;
};

export type AuthenticationType = {
  _id: mongodb.ObjectID;
  password: String;
  salt: String;
  user: mongodb.ObjectID;
};
