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
    const image = req.body.image;
    const details = req.body.details;

    console.log(title);
    console.log(image);
    console.log(details);

    // // File uploaded?
    // if (!req.file || !req.file.path) {
    //   console.log("HERE!");
    //   const fileUploadError = new Error("Could not get the uploaded file!");
    //   fileUploadError.statusCode = 422;
    //   throw fileUploadError;
    // }

    // const newMessage = new DB.Message({
    //   title,
    //   image: image,
    //   details,
    //   creator: {
    //     name: "Aras",
    //   },
    // });

    // const createdMessage = await newMessage.createMessage();

    // res.json({
    //   message: "Post created!",
    //   post: {
    //     _id: createdMessage._id,
    //     title: createdMessage.title,
    //     image: createdMessage.image,
    //     creator: createdMessage.creator.name,
    //     createdAt: createdMessage.createdAt,
    //   },
    // });
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
    const updatedData = req.body;
    console.log(postId, updatedData);

    // const updatedPost = await DB.Message.updateMessage(postId, updatedData);

    // res.json({
    //   message: "Post updated successfully!",
    //   post: updatedPost,
    // });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
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
