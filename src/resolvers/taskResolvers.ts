import { Document } from "mongoose";
import { Task } from "../models";

export const taskResolvers = {
  Query: {
    tasks: async (): Promise<Document[]> => await Task.find({}).exec(),
  },
};
