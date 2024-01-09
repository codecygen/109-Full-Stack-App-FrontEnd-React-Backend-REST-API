const DB = require("../models/DB");

const getPosts = async (req, res, next) => {
  const allMessages = await DB.Message.getMessages();

  res.status(200).json({
    posts: allMessages,
  });
};

const postPost = async (req, res, next) => {
  console.log(req.body);
  const title = req.body.title;
  const image = req.body.image;
  const details = req.body.details;

  console.log(title);
  console.log(image)
  console.log(details);

  const newMessage = new DB.Message({
    title,
    image,
    details,
    creator: {
      name: "Aras",
    },
  });

  try {
    const createdMessage = await newMessage.createMessage();

    res.status(201).json({
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

module.exports = { getPosts, postPost };
