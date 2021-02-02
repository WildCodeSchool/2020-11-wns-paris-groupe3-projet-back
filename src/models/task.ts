import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const TaskSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    taskname: {
      required: true,
      type: String,
    },

    url: {
      required: true,
      type: String,
    },

    creation_date: {
      required: true,
      type: Date,
    },

    users: [{ type: ObjectID, ref: "User" }],
  },

  { collection: "Task" }
);

export const Task = mongoose.model("Task", TaskSchema);
