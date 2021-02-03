import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const CorrectionSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    url: {
      type: String,
    },

    creation_date: {
      type: Date,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Correction" }
);

export const Correction = mongoose.model("Correction", CorrectionSchema);
