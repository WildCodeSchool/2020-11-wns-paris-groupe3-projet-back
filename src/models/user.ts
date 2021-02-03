import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const UserSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    username: {
      type: String,
      required: true,
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: "Role",
    },

    speciality: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Specialty",
    },
  },

  { collection: "User" }
);

export const User = mongoose.model("User", UserSchema);
