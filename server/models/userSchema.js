const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    posts: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Message",
        required: true,
      },
    ],
  },
  { collection: "UserSchema", timestamps: true }
);

userSchema.statics.findUser = async function (email) {
  try {
    const foundUser = await this.findOne({ email: email });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
