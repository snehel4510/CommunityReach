import mongoose from "mongoose";

const CommSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    coverPic: {
      type: String,
      default: "",
    },
    members: {
      type: Array,
      default: [],
    },
    posts: {
      type: Array,
      default: [],
    },
    about: String,
  },
  { timestamps: true }
);

const Comm = mongoose.model("Community", CommSchema);
export default Comm;