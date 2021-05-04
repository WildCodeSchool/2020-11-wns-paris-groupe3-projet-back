import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { TaskType, InputTaskType } from "../types/type";
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
    createTask: async (
      parent: undefined,
      { input: { url, taskname } }: InputTaskType
    ): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(url);
        const response = await createNewTask(taskname, result.secure_url);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
