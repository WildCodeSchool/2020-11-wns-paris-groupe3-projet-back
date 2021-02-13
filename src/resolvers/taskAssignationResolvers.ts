import mongodb from "mongodb";
import { Document } from "mongoose";

import {
  TaskAssignationType,
  ClassroomType,
  InputTaskAssignation,
} from "../types/types";
import { Task, Classroom, TaskAssignation } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewAssignation = (
  task: mongodb.ObjectID,
  classroom: mongodb.ObjectID
): Promise<Document> => {
  const newAssignation: TaskAssignationType = {
    _id: new ObjectID(),
    task,
    classroom,
  };
  return TaskAssignation.create(newAssignation);
};

export const taskAssignationResolvers = {
  Classroom: {
    users: async (classroom: ClassroomType): Promise<Document[]> => {
      return (await classroom.populate("users").execPopulate()).users;
    },
  },

  Query: {
    classrooms: async (): Promise<Document[]> =>
      await Classroom.find({}).exec(),
  },

  Mutation: {
    createAssignation: async (
      parent: undefined,
      args: any
    ): Promise<Document> => {
      console.log("***args", args);
      try {
        const task = await Task.findById({ _id: args.input.task });
        const classroom = await Classroom.findById({
          _id: args.input.classroom,
        });
        const result = await createNewAssignation(task, classroom);
        console.log(
          "***task",
          task,
          "***classroom",
          classroom,
          "***result",
          result
        );
        return result;
      } catch (e) {
        return e.message;
      }
    },
  },
};
