import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const GradeSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    result: {
      type: Number,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Grade" }
);

export const Grade = mongoose.model("Grade", GradeSchema);
