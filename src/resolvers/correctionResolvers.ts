import mongodb from "mongodb";
import { Document } from "mongoose";

import { cloudinaryConfig, uploadToCloudinary } from "../utils/cloudinary";

import { CorrectionType } from "../types/type";
import { Correction } from "../models";

const ObjectID = mongodb.ObjectID;

export const correctionResolvers = {
  Mutation: {
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
