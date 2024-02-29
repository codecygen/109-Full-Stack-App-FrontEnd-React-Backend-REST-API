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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

messageSchema.statics.getMessages = async function (currentPage, itemsPerPage) {
  try {
    const allPosts = await this.find()
      .populate({
        path: "creator",
        select: "name",
      })
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage);
      
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
    const foundPost = await this.findById(postId).populate({
      path: "creator",
      select: ["name", "email", "status", "color"],
    });
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

messageSchema.statics.updateMessage = async function (postId, postData) {
  try {
    const updatedPost = await this.findOneAndUpdate({ _id: postId }, postData, {
      new: true,
    });
    if (!updatedPost) {
      const updatedPostError = new Error("Could not update the post!");
      updatedPostError.statusCode = 500;
      throw updatedPostError;
    }
    return updatedPost;
  } catch (err) {
    throw err;
  }
};

messageSchema.statics.deleteMessage = async function (postId) {
  try {
    const deletedPost = await this.deleteOne({ _id: postId });
    if (!deletedPost) {
      const deletedPostError = new Error("Could not delete the post!");
      deletedPostError.statusCode = 500;
      throw deletedPostError;
    }
    return deletedPost;
  } catch (err) {
    throw err;
  }
};

messageSchema.statics.countMessages = async function () {
  try {
    const totalPosts = await this.countDocuments();
    if (!totalPosts && totalPosts !== 0) {
      const totalPostError = new Error("Could not count the posts!");
      totalPostError.statusCode = 500;
      throw totalPostError;
    }
    return totalPosts;
  } catch (err) {
    throw err;
  }
};

module.exports = mongoose.model("Message", messageSchema);
