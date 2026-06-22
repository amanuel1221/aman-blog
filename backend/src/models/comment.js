const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Comment content is required"],
      trim: true,
      minlength: 1,
      maxlength: 1000,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

  parentComment: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Comment",
  default: null,
},

  likes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],

  dislikes: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
],
  },

{
  timestamps: true,
  }
);
const Comments = mongoose.model("Comments", commentSchema);
module.exports = Comments;