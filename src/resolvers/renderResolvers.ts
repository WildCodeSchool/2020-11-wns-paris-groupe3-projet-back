import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { RenderType } from "../types/type";
import { Render } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewRender = (task: any, user: any, result: any) => {
  const newRender: RenderType = {
    _id: new ObjectID(),
    url: result.secure_url,
    task: task,
    user: user,
    creation_date: Date.now(),
  };
  return Render.create(newRender);
};

export const renderResolvers = {
  Mutation: {
    createRender: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const response = await createNewRender(
          args.input.task,
          args.input.user,
          result
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
