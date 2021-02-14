import mongodb from "mongodb";

export type UserType = {
  _id: mongodb.ObjectID;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  creation_date: number;
};

export type InputRegisterType = {
  input: {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  errors: { [key: string]: string };
  valid: boolean;
};

export type InputLoginType = {
  email: string;
  password: string;
};

export type TokenType = {
  _id: mongodb.ObjectID;
  firstname: string;
  lastname: string;
  email: string;
};

export type InputRegisterLoginErrorsType = {
  errors: { [key: string]: string };
  valid: boolean;
};

export type UserDetailsType = {
  _id: mongodb.ObjectID;
  username: string;
  role: mongodb.ObjectID;
  speciality: mongodb.ObjectID;
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

export type specialityType = {
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
  creation_date: Date;
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
