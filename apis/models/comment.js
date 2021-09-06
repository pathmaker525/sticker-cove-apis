const mongoose = require("mongoose")
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: "Error: We need your firstname",
    },
    lastname: {
      type: String,
      trim: true,
      required: "Error: We need your lastname",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: "Error: We need your email address",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    comment: {
      type: String,
      trim: true,
      required: "Error: We need to hear from you",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Comment", commentSchema)
