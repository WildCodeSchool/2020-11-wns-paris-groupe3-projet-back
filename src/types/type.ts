import mongodb from "mongodb";

export type UserType = {
  _id: mongodb.ObjectID;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: mongodb.ObjectID | null;
  speciality: mongodb.ObjectID | null;
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

export type InputRegisterLoginErrorsType = {
  errors: { [key: string]: string };
  valid: boolean;
};

export type TaskType = {
  _id: mongodb.ObjectID;
  taskname: string;
  url: string;
  creation_date: number;
  // user: mongodb.ObjectID;
};

export type TaskAssignationType = {
  _id: mongodb.ObjectID;
  task: mongodb.ObjectID;
  end_date: Date;
  affectedTo: mongodb.ObjectID;
};

export type InputTaskAssignation = {
  input: {
    task: mongodb.ObjectID;
    end_date: Date;
    affectedTo: mongodb.ObjectID;
  };
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
  user: mongodb.ObjectID;
  task: mongodb.ObjectID;
  url: string;
  creation_date: number;
};

export type CommentType = {
  _id: mongodb.ObjectID;
  user: mongodb.ObjectID;
  task: mongodb.ObjectID;
  content: string;
  creation_date: number;
};

export type InputCommentType = {
  input: {
    user: mongodb.ObjectID;
    task: mongodb.ObjectID;
    content: string;
  };
};

export type InputUpdateCommentType = {
  _id: mongodb.ObjectID;
  input: {
    content: string;
  };
};

export type DeleteCommentType = {
  _id: mongodb.ObjectID;
};

export type ClassroomType = {
  _id: mongodb.ObjectID;
  classname: string;
  users: Array<mongodb.ObjectID>;
};

export type InputClassroomType = {
  input: {
    classname: string;
    users: Array<mongodb.ObjectID>;
  };
};

export type AuthenticationType = {
  _id: mongodb.ObjectID;
  password: string;
  salt: string;
  user: mongodb.ObjectID;
};

export type InputTaskType = {
  input: {
    taskname: string;
    url: string;
    // user: mongodb.ObjectID;
  };
};

export type InputRenderType = {
  input: {
    task: mongodb.ObjectID;
    user: mongodb.ObjectID;
    url: string;
  };
};

export type InputCorrectionType = {
  input: {
    task: mongodb.ObjectID;
    user: mongodb.ObjectID;
    url: string;
  };
};
