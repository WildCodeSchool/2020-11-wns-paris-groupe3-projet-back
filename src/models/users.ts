import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    _id: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  { collection: "Users" }
);

export const User = mongoose.model("User", UserSchema);
