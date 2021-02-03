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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    creation_date: {
      required: true,
      type: Date,
    },
  },

  { collection: "Task" }
);

export const Task = mongoose.model("Task", TaskSchema);
