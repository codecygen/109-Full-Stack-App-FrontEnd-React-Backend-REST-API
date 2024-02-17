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
      // This is coming from validateAuth.js middleware
      // Authentication-and-Authorization-Backend
      creator: req.userId,
    });

    const createdMessage = await newMessage.createMessage();

    const updatedUser = await DB.User.findUserAndSavePostId(
      req.userId,
      createdMessage._id
    );

    res.json({
      message: "Post created!",
      post: {
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

    // This is coming from postChangeAuthorization.js middleware
    // the posts' existance and if the requestor is authorized to
    // edit or delete it is determined in this middleware
    const existingPost = req.existingPost;

    let updatedData;

    // File uploaded?
    // If yes, delete old image
    if (req.file && req.file.path) {
      // delete the old image
      const oldImage = existingPost.image;

      fs.unlink(oldImage, (err) => {
        if (err) {
          throw new Error(
            "Image could not be deleted for post update request!"
          );
        }
      });

      updatedData = {
        title,
        image: req.file.path,
        details,
      };
    }

    // if no file uploaded, don't delete any image
    // proceed with only title and details update
    updatedData = {
      title,
      details,
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

    // This is coming from postChangeAuthorization.js middleware
    // the posts' existance and if the requestor is authorized to
    // edit or delete it is determined in this middleware
    const existingPost = req.existingPost;

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

    // delete post id from the user in database
    const updatedUser = await DB.User.findUserAndDeletePostId(
      existingPost.creator._id,
      postId
    );

    res.json({
      message: "Post deleted successfully!",
      post: deletedPost,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts, postPost, getPost, updatePost, deletePost };
