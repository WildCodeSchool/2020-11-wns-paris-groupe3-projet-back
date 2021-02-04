import { Document } from "mongoose";
import { User } from "../models";

export const userResolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find({}).exec(),
  },
};
