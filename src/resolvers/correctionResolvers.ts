import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { CorrectionType, InputCorrectionType } from "../types/type";
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
    createCorrection: async (
      parent: undefined,
      { input: { task, user, url } }: InputCorrectionType
    ): Promise<Document> => {
      cloudinaryConfig();
      try {
        const result = await uploadToCloudinary(url);
        const response = await createNewCorrection(
          task,
          user,
          result.secure_url
        );
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};
