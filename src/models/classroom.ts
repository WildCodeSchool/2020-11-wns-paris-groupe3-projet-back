import mongoose, { Schema } from "mongoose";
import mongodb from "mongodb";
const ObjectID = mongodb.ObjectID;

export const ClassroomSchema = new Schema(
  {
    _id: {
      type: ObjectID,
    },

    classname: {
      type: String,
    },

    users: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { collection: "Classroom" }
);

export const Classroom = mongoose.model("Classroom", ClassroomSchema);
