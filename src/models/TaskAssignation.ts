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

    classroom: {
      type: Schema.Types.ObjectId,
      ref: "Classroom",
    },

    // publication_date: {
    //   type: Date,
    // },

    // end_date: {
    //   type: Date,
    // },

    //affectedTo: [{ type: ObjectID, ref: ["User", "Group", "Classroom"] }],
  },

  { collection: "TaskAssignation" }
);

export const TaskAssignation = mongoose.model(
  "TaskAssignation",
  TaskAssignationSchema
);
