import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const TaskSchema = new Schema(
  {
    _id: {
      type: String,
    },

    title: {
      type: String,
    },

    start: {
      type: String,
    },

    end: {
      type: String,
    },
  },

  { collection: "Tasks" }
);

export const Task = mongoose.model("Task", TaskSchema);
