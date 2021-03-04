import mongodb from "mongodb";
import { Document } from "mongoose";
import { UserInputError } from "apollo-server-express";

import { TaskAssignationType, InputTaskAssignation } from "../types/types";
import { Task, Classroom, TaskAssignation } from "../models";

const ObjectID = mongodb.ObjectID;

export const createNewAssignation = (
  task: mongodb.ObjectID,
  end_date: Date,
  affectedTo: mongodb.ObjectID
): Promise<Document> => {
  const newAssignation: TaskAssignationType = {
    _id: new ObjectID(),
    task,
    end_date,
    affectedTo,
  };
  return TaskAssignation.create(newAssignation);
};

export const taskAssignationResolvers = {
  Query: {
    tasksAssignations: async (): Promise<Document[]> =>
      await TaskAssignation.find({})
        .populate("affectedTo")
        .populate("task")
        .exec(),
  },

  Mutation: {
    createAssignation: async (
      parent: undefined,
      { input: { task, end_date, affectedTo } }: InputTaskAssignation
    ): Promise<Document> => {
      const fetchTask: any = await Task.findOne({ _id: task });
      const fetchClass: any = await Classroom.findOne({ _id: affectedTo });
      if (fetchTask && fetchClass) {
        try {
          const result = await createNewAssignation(
            fetchTask,
            end_date,
            fetchClass
          );
          return result;
        } catch (err) {
          return err.message;
        }
      } else {
        throw new UserInputError("Invalid argument value");
      }
    },
  },
};
