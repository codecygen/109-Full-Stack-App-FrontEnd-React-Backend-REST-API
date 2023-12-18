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
    const result = await this.save();
    return result;
  } catch (err) {
    console.error(err);
  }
};

module.exports = mongoose.model("Message", messageSchema);
