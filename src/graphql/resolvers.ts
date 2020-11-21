import mongodb from "mongodb"
import { Document } from "mongoose";
import { Task } from "../models/task";
import { User } from "../models/users";

const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    getUsers: async (): Promise<Document[]> => await User.find({}).exec(),
    allTasks: async (): Promise<Document[]> => await Task.find({}).exec(),
  },
  
  Mutation: {
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
