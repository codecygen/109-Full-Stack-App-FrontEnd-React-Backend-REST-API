const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },
  },
  { collection: "CommentSchema", timestamps: true }
);

commentSchema.methods.createComment = async function () {
  try {
    const createdComment = this.save();
    return createdComment;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Comment", commentSchema);