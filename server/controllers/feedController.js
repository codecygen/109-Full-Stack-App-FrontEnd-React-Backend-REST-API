const DB = require("../models/DB");

const getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/duck.webp",
        creator: {
          name: "Aras",
        },
        createdAt: new Date(),
      },
    ],
  });
};

const postPost = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const newMessage = new DB.Message({
    messageTitle: title,
    messageImgUrl: "www.google.com",
    messageContent: content,
    messageCreator: {
      name: "Aras",
    },
  });

  try {
    const createdMessage = await newMessage.createMessage();

    res.status(201).json({
      message: "Post created!",
      post: {
        _id: createdMessage._id,
        title: createdMessage.messageTitle,
        content: createdMessage.messageContent,
        creator: createdMessage.messageCreator,
        createdAt: createdMessage.createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getPosts, postPost };
