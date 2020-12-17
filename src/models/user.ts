import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const UserSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    role_id: {
      type: ObjectID,
    },

    speciality_id: {
      type: ObjectID,
    },
  },

  { collection: "Users" }
);

export const User = mongoose.model("User", UserSchema);
