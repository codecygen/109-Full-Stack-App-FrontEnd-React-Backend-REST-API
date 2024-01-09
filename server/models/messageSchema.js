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
      const creationError = new Error("Database failed to save data!");
      creationError.statusCode = 500;
      throw creationError;
    }

    return createdPost;
  } catch (err) {
    // rethrow the error to propagate it to the calling code
    throw err;
  }
};

messageSchema.statics.getMessages = async function (postId) {
  try {
    const allPosts = this.find();
    return allPosts;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("Message", messageSchema);
