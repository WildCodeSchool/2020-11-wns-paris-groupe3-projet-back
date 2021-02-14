import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const UserDetailsSchema = new Schema(
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
      ref: "speciality",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "User_details" }
);

export const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
