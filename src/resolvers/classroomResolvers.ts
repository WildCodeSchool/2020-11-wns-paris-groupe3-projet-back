import mongodb from "mongodb";
import { Document } from "mongoose";

import { ClassroomType, InputClassroomType } from "../types/type";
import { Classroom } from "../models";

const ObjectID = mongodb.ObjectID;

export const classroomResolvers = {
  Query: {
    classrooms: async (): Promise<Document[]> =>
      await Classroom.find({}).populate("users").exec(),

    classroomById: async (
      parent: undefined,
      { _id }: ClassroomType
    ): Promise<Document | null> => {
      const classroom:
        | ClassroomType
        | Document
        | null = await Classroom.findOne({ _id }).populate("users").exec();
      return classroom;
    },
  },

  Mutation: {
    createClassroom: async (
      parent: undefined,
      { input: { classname, users } }: InputClassroomType
    ): Promise<Document> => {
      const newClassroom = await Classroom.create({
        _id: new ObjectID(),
        classname,
        users,
      });
      return newClassroom;
    },
  },
};
