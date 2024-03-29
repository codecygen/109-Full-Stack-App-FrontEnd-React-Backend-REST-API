const fs = require("fs");
const jwt = require("jsonwebtoken");
const DB = require("../models/DB");

const { getIO } = require("../sockets/socket");
const { io } = require("socket.io-client");

const getPosts = async (req, res, next) => {
  try {
    const currentPage = +req.query.page;
    const totalPosts = await DB.Message.countMessages();
    const itemsPerPage = 10;

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
        next(err);
      }
    });

    const deletedPost = await DB.Message.deleteMessage(postId);

    // delete post id from the user in database
    const updatedUser = await DB.User.findUserAndDeletePostId(
      existingPost.creator._id,
      postId
    );

    // delete all associated comments with the post
    await DB.Comment.deleteComments(postId);

    res.json({
      message: "Post deleted successfully!",
      post: deletedPost,
    });
  } catch (err) {
    next(err);
  }
};

const postComment = async (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    let decodedToken;

    if (token === "null") {
      decodedToken = null;
    } else {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    }

    const postId = req.params.postId;
    const comment = req.body.comment;

    const foundPost = await DB.Message.getMessage(postId);

    if (!foundPost) {
      throw new Error("No post found for posting comment!");
    }

    let userEmail;
    let foundUser;

    if (decodedToken) {
      userEmail = decodedToken.email;
      foundUser = await DB.User.findUserWithEmail(userEmail);
      if (!foundUser) {
        throw new Error("No user found for posting comment!");
      }
    } else if (!decodedToken) {
      foundUser = await DB.User.findUserWithName("guest");
    }

    const newComment = new DB.Comment({
      messageId: foundPost._id,
      userId: foundUser._id,
      comment: comment,
    });

    await newComment.createComment();
    const comments = await DB.Comment.getComments(postId);

    const io = getIO();

    // io.broadcast, if you want to show everyone except for the sender
    // io.emit, if you want to show everyone
    io.emit(`comments${postId}`, {
      action: "POST",
      comment: comments,
    });

    res.json({
      message: "POST request for comment was successful!!",
      comment: comments,
    });
  } catch (err) {
    next(err);
  }
};

const getComments = async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const comments = await DB.Comment.getComments(postId);

    const io = getIO();

    io.emit(`comments${postId}`, {
      action: "POST",
      comment: comments,
    });

    res.json({
      message: "GET request for comments was successful!!",
      comment: comments,
    });
  } catch (err) {
    next(err);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const foundComment = req.foundComment;

    await DB.Comment.deleteComment(foundComment._id);

    const comments = await DB.Comment.getComments(foundComment.messageId);

    const io = getIO();

    io.emit(`comments${foundComment.messageId}`, {
      action: "DELETE",
      comment: comments,
    });

    res.json({
      message: "DELETE request for comment was successful!!",
      comment: comments,
    });
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const foundComment = req.foundComment;

    const messageId = foundComment.messageId;
    const newComment = req.newComment;
    const commentId = foundComment._id;

    console.log(foundComment);
    console.log("messageId", messageId);
    console.log("New Comment: ", newComment);
    console.log("commentId", commentId);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getPosts,
  postPost,
  getPost,
  updatePost,
  deletePost,
  postComment,
  getComments,
  deleteComment,
  updateComment,
};
