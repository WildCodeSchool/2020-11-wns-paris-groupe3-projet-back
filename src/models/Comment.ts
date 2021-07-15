import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const CommentSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    user: {
      type: ObjectID,
      ref: "User",
    },

    task: {
      type: ObjectID,
      ref: "Task",
    },

    content: {
      type: String,
    },

    creation_date: {
      type: Date,
    },
  },

  { collection: "Comment" }
);

export const Comment = mongoose.model("Comment", CommentSchema);
