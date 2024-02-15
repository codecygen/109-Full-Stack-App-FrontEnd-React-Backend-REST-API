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
      default: function () {
        const emails = process.env.ADMIN_EMAILS.split(",");
        const isAdmin = emails.includes(this.email);

        if (isAdmin) {
          return "admin";
        } else {
          return "user";
        }
      },
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

userSchema.methods.createUser = async function () {
  try {
    const createdUser = await this.save();
    return createdUser;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.findUserWithEmail = async function (email) {
  try {
    const foundUser = await this.findOne({ email: email });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.findUserWithName = async function (name) {
  try {
    const foundUser = await this.findOne({ name: name });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.findUserAndSavePostId = async function (userId, postId) {
  try {
    const foundUser = await this.findOne({ _id: userId });
    foundUser.posts.push(postId);
    const updatedFoundUser = await foundUser.save();

    return updatedFoundUser;
  } catch (err) {
    throw err;
  }
};

userSchema.statics.findUserAndDeletePostId = async function (userId, postId) {
  try {
    const foundUser = await this.findOne({ _id: userId });
    foundUser.posts.pull(postId);
    const updatedFoundUser = await foundUser.save();

    return updatedFoundUser;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("User", userSchema);
