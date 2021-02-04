import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { Task } from "../models/task";
import { User } from "../models/user";
import { Render } from "../models/render";
import { Correction } from "../models/correction";
import { RenderType, TaskType, CorrectionType } from "allTypes";

const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find({}).exec(),
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

    createRender: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const newRender: RenderType = {
          _id: new ObjectID(),
          url: result.secure_url,
          creation_date: Date.now(),
          task: args.input.task,
          user: args.input.user,
        };
        const response = await Render.create(newRender);
        return response;
      } catch (e) {
        return e.message;
      }
    },

    createCorrection: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const newCorrection: CorrectionType = {
          _id: new ObjectID(),
          url: result.secure_url,
          creation_date: Date.now(),
          task: args.input.task,
          user: args.input.user,
        };
        const response = await Correction.create(newCorrection);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

export default resolvers;
