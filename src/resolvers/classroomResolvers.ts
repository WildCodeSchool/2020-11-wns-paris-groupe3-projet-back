import { Document } from "mongoose";

import { Classroom } from "../models";

export const classroomResolvers = {
  Query: {
    classrooms: async (): Promise<Document[]> =>
      await Classroom.find({}).populate("users").exec(),
  },
};
