import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { RenderType } from "../types/type";
import { Render } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewRender = (
  task: mongodb.ObjectID,
  user: mongodb.ObjectID,
  result: string
): Promise<Document> => {
  const newRender: RenderType = {
    _id: new ObjectID(),
    url: result,
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
          result.secure_url
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
