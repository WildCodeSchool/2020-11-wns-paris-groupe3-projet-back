import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const RenderSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    creation_date: {
      type: Date,
    },
  },

  { collection: "Render" }
);

export const Render = mongoose.model("Render", RenderSchema);
