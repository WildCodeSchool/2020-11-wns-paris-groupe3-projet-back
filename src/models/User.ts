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
      required: true,
    },

    lastname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    creation_date: {
      type: Date,
    },
  },

  { collection: "User" }
);

export const User = mongoose.model("User", UserSchema);
