const fs = require("fs");
const DB = require("../models/DB");

const getPosts = async (req, res, next) => {
  try {
    const allMessages = await DB.Message.getMessages();

    res.json({
      posts: allMessages,
    });
  } catch (err) {
    next(err);
  }
};

const postPost = async (req, res, next) => {
  try {
    const title = req.body.title;
    const details = req.body.details;

    // File uploaded?
    if (!req.file || !req.file.path) {
      const fileUploadError = new Error(
        "Could not get the uploaded file for new post creation!"
      );
      fileUploadError.statusCode = 422;
      throw fileUploadError;
    }

    const newMessage = new DB.Message({
      title,
      image: req.file.path,
      details,
      creator: {
        name: "Aras",
      },
    });

    const createdMessage = await newMessage.createMessage();

    res.json({
      message: "Post created!",
      post: {
        _id: createdMessage._id,
        title: createdMessage.title,
        image: createdMessage.image,
        creator: createdMessage.creator.name,
        createdAt: createdMessage.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const foundPost = await DB.Message.getMessage(postId);

    res.json({
      message: "Post found!",
      post: foundPost,
    });
  } catch (err) {
    next(err);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const sentData = req.body;

    const existingPost = await DB.Message.getMessage(postId);

    // Check if post exists in database
    if (!existingPost) {
      const existingPostError = new Error(
        `Post ID ${postId} does not exist in database for updating!`
      );
      existingPostError.statusCode = 500;
      throw existingPostError;
    }

    // File uploaded?
    if (!req.file || !req.file.path) {
      const fileUploadError = new Error(
        "Could not get the uploaded file for post updating!"
      );
      fileUploadError.statusCode = 422;
      throw fileUploadError;
    }

    // delete the old image
    const oldImage = existingPost.image;

    fs.unlink(oldImage, (err) => {
      if (err) {
        throw new Error("Image could not be deleted for post update request!");
      }
    });

    const updatedData = {
      title: sentData.title,
      image: req.file.path,
      details: sentData.details,
      creator: {
        name: "Aras",
      },
    };

    const updatedPost = await DB.Message.updateMessage(postId, updatedData);

    res.json({
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const existingPost = await DB.Message.getMessage(postId);

    // Check if post exists in database
    if (!existingPost) {
      const existingPostError = new Error(
        `Post ID ${postId} does not exist in database for deletion!`
      );
      existingPostError.statusCode = 500;
      throw existingPostError;
    }

    // delete the old image
    const oldImage = existingPost.image;

    fs.unlink(oldImage, (err) => {
      if (err) {
        throw new Error(
          "Image could not be deleted for post deletion request!"
        );
      }
    });

    const deletedPost = await DB.Message.deleteMessage(postId);

    res.json({
      message: "Post deleted successfully!",
      post: deletedPost,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts, postPost, getPost, updatePost, deletePost };
