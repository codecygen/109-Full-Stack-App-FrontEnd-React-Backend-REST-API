const { promisify } = require("util");

const mongoose = require("mongoose");
const crypto = require("crypto");

const bcrypt = require("bcrypt");
const hashPass = promisify(bcrypt.hash);

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

    // this is the hex color code for
    // the specified user that will be
    // used in front end rendering
    color: {
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
        type: mongoose.Schema.Types.ObjectId,
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

userSchema.statics.createGuestUser = async function () {
  try {
    const randomPass = crypto.randomBytes(32).toString("hex");
    const saltRounds = 12;
    const hashedPassword = await hashPass(randomPass, saltRounds);

    const newGuest = new this({
      email: `${crypto.randomBytes(32).toString("hex")}@${crypto
        .randomBytes(32)
        .toString("hex")}.com`,
      password: hashedPassword,
      name: `guest`,
      color: "#4f4f4f",
    });

    const createdGuest = await newGuest.save();
    return createdGuest;
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
