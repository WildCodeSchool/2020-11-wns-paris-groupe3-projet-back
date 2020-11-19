import mongoose, { Schema } from "mongoose";

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
