import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { TaskType } from "../types/type";
import { Task } from "../models";

const ObjectID = mongodb.ObjectID;

export const taskResolvers = {
  Query: {
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
  },

  Mutation: {
    createTask: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const newTask: TaskType = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          url: result.secure_url,
          creation_date: Date.now(),
          // user: args.input.user,
        };
        const response = await Task.create(newTask);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
