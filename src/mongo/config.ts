import mongoose from "mongoose";
import dotenv from "dotenv";
mongoose.Promise = global.Promise;

dotenv.config();

const url = process.env.ATLAS_URI;

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));
