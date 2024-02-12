const fs = require("fs");
const DB = require("../models/DB");
const { ObjectId } = require("mongodb");

const getPosts = async (req, res, next) => {
  try {
    const currentPage = +req.query.page;
    const totalPosts = await DB.Message.countMessages();
    const itemsPerPage = 3;

    const totalPages = Math.ceil(+(totalPosts / itemsPerPage));

    const pagePosts = await DB.Message.getMessages(currentPage, itemsPerPage);

    res.json({
      posts: pagePosts,
      currentPage,
      totalPages,
      totalPosts,
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
      creator: new ObjectId("65c7ea30c6242e927cab802a"),
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
    const title = req.body.title;
    const details = req.body.details;

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
      title,
      image: req.file.path,
      details,
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
