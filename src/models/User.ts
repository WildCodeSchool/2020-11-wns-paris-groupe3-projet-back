import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const UserSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    firstname: {
      type: String,
    },

    lastname: {
      type: String,
    },

    email: {
      type: String,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Role",
    },

    speciality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Speciality",
    },
  },

  { collection: "User" }
);

export const User = mongoose.model("User", UserSchema);
