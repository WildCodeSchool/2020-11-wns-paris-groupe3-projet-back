import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const specialitySchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    speciality_name: {
      type: String,
      required: true,
    },
  },

  { collection: "speciality" }
);

export const speciality = mongoose.model("speciality", specialitySchema);
