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

    // FILE

    creation_date: {
      type: Date,
    },
  },

  { collection: "Correction" }
);

export const Correction = mongoose.model("Correction", CorrectionSchema);
