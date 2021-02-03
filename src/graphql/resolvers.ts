import mongodb from "mongodb";
import cloudinary from "cloudinary";
import { Document } from "mongoose";

import { Task } from "../models/task";
import { User } from "../models/user";
import { Render } from "../models/render";
import { Correction } from "../models/correction";
import { RenderType, TaskType, CorrectionType } from "allTypes";

const cloudinaryConfig = () => {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const ObjectID = mongodb.ObjectID;

const resolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find({}).exec(),
  },

  Mutation: {
    createTask: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await cloudinary.v2.uploader.upload(args.input.url, {
          allowed_formats: ["jpg", "png"],
          folder: "EasyHomeworks",
        });
        const newTask: TaskType = {
          _id: new ObjectID(),
          taskname: args.input.taskname,
          url: result.secure_url,
          creation_date: Date.now(),
          users: args.input.users,
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
        const result = await cloudinary.v2.uploader.upload(args.input.url, {
          allowed_formats: ["jpg", "png"],
          folder: "EasyHomeworks",
        });
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
        const result = await cloudinary.v2.uploader.upload(args.input.url, {
          allowed_formats: ["jpg", "png"],
          folder: "EasyHomeworks",
        });
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
