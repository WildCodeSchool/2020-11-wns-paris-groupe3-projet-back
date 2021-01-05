import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const AuthenticationSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    password: {
      type: String,
    },

    salt: {
      type: String,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Authentication" }
);

export const Authentication = mongoose.model(
  "Authentication",
  AuthenticationSchema
);
