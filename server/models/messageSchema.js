const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    creator: {
      type: Object,
      required: true,
    },
  },
  {
    collection: "MessageSchema",
    timestamps: true,
  }
);

messageSchema.methods.createMessage = async function () {
  try {
    const createdPost = await this.save();

    if (!createdPost) {
      const creationError = new Error("Database failed to save post!");
      creationError.statusCode = 500;
      throw creationError;
    }

    return createdPost;
  } catch (err) {
    // rethrow the error to propagate it to the calling code
    throw err;
  }
};

messageSchema.statics.getMessages = async function () {
  try {
    const allPosts = this.find();
    if (!allPosts) {
      const allPostError = new Error("Could not get all posts!");
      allPostError.statusCode = 500;
      throw allPostError;
    }
    return allPosts;
  } catch (err) {
    throw err;
  }
};

messageSchema.statics.getMessage = async function (postId) {
  try {
    const foundPost = await this.findById(postId);
    if (!foundPost) {
      const foundPostError = new Error("Could not get the post!");
      foundPostError.statusCode = 500;
      throw foundPostError;
    }
    return foundPost;
  } catch (err) {
    throw err;
  }
};

messageSchema.statics.deleteMessage = async function (postId) {
  try {
    const deletedPost = await this.deleteOne({ _id: postId });
    if (!deletedPost) {
      const deletedPostError = new Error("Coould not delete the post!");
      deletedPostError.statusCode = 500;
      throw deletedPostError;
    }
    return deletedPost;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Message", messageSchema);
