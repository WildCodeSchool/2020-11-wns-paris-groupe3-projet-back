import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const GroupSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    groupname: {
      type: String,
    },

    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Group" }
);

export const Group = mongoose.model("Group", GroupSchema);
