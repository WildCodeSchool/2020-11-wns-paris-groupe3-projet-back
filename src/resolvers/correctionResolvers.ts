import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { CorrectionType } from "../types/type";
import { Correction } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewCorrection = (
  task: mongodb.ObjectID,
  user: mongodb.ObjectID,
  result: string
): Promise<Document> => {
  const newCorrection: CorrectionType = {
    _id: new ObjectID(),
    url: result,
    task: task,
    user: user,
    creation_date: Date.now(),
  };
  return Correction.create(newCorrection);
};

export const correctionResolvers = {
  Mutation: {
    createCorrection: async (parent: any, args: any): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(args.input.url);
        const response = await createNewCorrection(
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
