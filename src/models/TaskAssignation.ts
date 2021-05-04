import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const TaskAssignationSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    task: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },

    end_date: {
      type: Date,
    },

    affectedTo: {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },
  },

  { collection: "TaskAssignation" }
);

export const TaskAssignation = mongoose.model(
  "TaskAssignation",
  TaskAssignationSchema
);
