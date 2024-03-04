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

commentSchema.statics.getComment = async function (commentId) {
  try {
    const comment = await this.findOne({ _id: commentId });

    if (!comment) {
      const getCommentError = new Error("Could not get related comment!");
      getCommentError.statusCode = 500;
      throw getCommentError;
    }

    return comment;
  } catch (err) {
    throw err;
  }
};

commentSchema.statics.getComments = async function (postId) {
  try {
    const comments = await this.find({ messageId: postId })
      .populate({
        path: "userId",
        select: ["name", "status", "color"],
      })
      .sort({ createdAt: -1 });

    if (!comments) {
      const getCommentsError = new Error("Could not get related comments!");
      getCommentsError.statusCode = 500;
      throw getCommentsError;
    }

    return comments;
  } catch (err) {
    throw err;
  }
};

// This is initiated when a person deletes a post
// associated comments should also be deleted
commentSchema.statics.deleteComments = async function (postId) {
  try {
    const deletedComments = await this.deleteMany({
      messageId: postId,
    });

    if (!deletedComments) {
      const deletedPostError = new Error("There is no comment to be deleted!");
      deletedPostError.statusCode = 500;
      throw deletedPostError;
    }

    return deletedComments;
  } catch (err) {
    throw err;
  }
};

commentSchema.statics.deleteComment = async function (commentId) {
  try {
    const deletedComment = await this.deleteOne({ _id: commentId });

    if (!deletedComment) {
      const deleteCommentError = new Error("Could not delete the comment!");
      deleteCommentError.statusCode = 500;
      throw deleteCommentError;
    }

    return deletedComment;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Comment", commentSchema);
