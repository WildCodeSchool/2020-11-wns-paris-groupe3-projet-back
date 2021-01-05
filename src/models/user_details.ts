import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const UserDetailsSchema = new Schema(
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

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "User_details" }
);

export const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
