import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { TaskType } from "../types/type";
import { Task } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewTask = (
  taskname: string,
  result: string
): Promise<Document> => {
  const newTask: TaskType = {
    _id: new ObjectID(),
    taskname: taskname,
    url: result,
    creation_date: Date.now(),
    // user: args.input.user,
  };
  return Task.create(newTask);
};

export const taskResolvers = {
  Query: {
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
  },

  Mutation: {
    createTask: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const response = await createNewTask(
          args.input.taskname,
          result.secure_url
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
