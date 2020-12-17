import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const SpecialitySchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    speciality_name: {
      type: String,
    },
  },

  { collection: "Specialty" }
);

export const Speciality = mongoose.model("Speciality", SpecialitySchema);
