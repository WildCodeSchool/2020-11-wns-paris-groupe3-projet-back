import { Document } from "mongoose";
import { User } from "../models";
import { UserType } from "../types/types";

export const userResolvers = {
  Query: {
    users: async (): Promise<Document[]> =>
      await User.find({}).populate("role").populate("speciality").exec(),

    user: async (parent: undefined, { _id }: UserType): Promise<any> =>
      await User.findById({ _id })
        .populate("role")
        .populate("speciality")
        .exec(),
  },
};
