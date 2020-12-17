import mongodb from "mongodb"
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/user";

const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find({}).exec(),
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
  },
  
  Mutation: {
    createUser: async (parent: any, args: any ): Promise<Document> => {
      try {
        const newUser = {
          name: args.input.name,
          _id: new ObjectID(),
        };
        const response = await User.create(newUser);
        return response;
      } catch (e) {
        return e.message;
      }
    },

    createTask: async (parent: any, args: any ): Promise<Document> => {
      try {
        const newTask = {
          title: args.input.title,
          start: args.input.start,
          end: args.input.end,
          _id: new ObjectID(),
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
