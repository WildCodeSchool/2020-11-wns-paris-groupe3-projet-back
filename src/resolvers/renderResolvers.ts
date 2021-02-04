import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { RenderType } from "../types/type";
import { Render } from "../models";

const ObjectID = mongodb.ObjectID;

export const renderResolvers = {
  Mutation: {
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
  },
};
