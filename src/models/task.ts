import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const { GraphQLDateTime } = require("graphql-iso-date");
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

    // File

    creation_date: {
      required: true,
      type: Date,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Task" }
);

export const Task = mongoose.model("Task", TaskSchema);
