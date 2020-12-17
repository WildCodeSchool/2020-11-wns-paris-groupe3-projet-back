import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const TaskSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    taskname: {
      type: String,
    },

    // File

    creation_date: {
      type: String,
    },

    user_id: {
      type: ObjectID,
    },
  },

  { collection: "Tasks" }
);

export const Task = mongoose.model("Task", TaskSchema);
