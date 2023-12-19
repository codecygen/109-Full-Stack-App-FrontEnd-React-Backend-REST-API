const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    messageTitle: {
      type: String,
      required: true,
    },

    messageImgUrl: {
      type: String,
      required: true,
    },

    messageContent: {
      type: String,
      required: true,
    },

    messageCreator: {
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
    // const createdPost = await this.save();

    const createdPost = "";

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

module.exports = mongoose.model("Message", messageSchema);
