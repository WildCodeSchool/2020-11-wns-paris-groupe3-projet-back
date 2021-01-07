import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";

const ObjectID = mongodb.ObjectID;

export const RoleSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    role_name: {
      type: String,
      required: true,
    },
  },

  { collection: "Role" }
);

export const Role = mongoose.model("Role", RoleSchema);
