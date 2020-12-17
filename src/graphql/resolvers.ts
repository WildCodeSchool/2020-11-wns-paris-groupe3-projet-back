import mongodb from "mongodb";
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";
import { Role } from "../models/role";

const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find({}).exec(),
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
    roles: async (): Promise<Document[]> => await Role.find({}).exec(),
  },

  Mutation: {
    createUser: async (parent: any, args: any): Promise<Document> => {
      try {
        const newUser = {
          _id: new ObjectID(),
          role_id: new ObjectID(),
          speciality_id: new ObjectID(),
        };
        const response = await User.create(newUser);
        return response;
      } catch (e) {
        return e.message;
      }
    },

    createTask: async (parent: any, args: any): Promise<Document> => {
      console.log(parent);
      try {
        const newTask = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          creation_date: args.input.creation_date,
          user_id: new ObjectID(),
        };
        const response = await Task.create(newTask);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

export default resolvers;
