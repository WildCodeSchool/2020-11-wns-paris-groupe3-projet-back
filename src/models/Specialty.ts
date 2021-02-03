import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const SpecialtySchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    specialty_name: {
      type: String,
      required: true,
    },
  },

  { collection: "Specialty" }
);

export const Specialty = mongoose.model("Specialty", SpecialtySchema);
