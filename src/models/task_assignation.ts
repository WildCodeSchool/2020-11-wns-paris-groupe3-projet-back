import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const TaskAssignationSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    publication_date: {
      type: Date,
    },

    end_date: {
      type: Date,
    },

    affectedTo: [{ type: ObjectID, ref: ["User", "Group", "Classroom"] }],
  },

  { collection: "Task_assignation" }
);

export const TaskAssignation = mongoose.model(
  "TaskAssignation",
  TaskAssignationSchema
);
