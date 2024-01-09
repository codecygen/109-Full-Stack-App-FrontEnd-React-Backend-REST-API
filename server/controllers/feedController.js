const DB = require("../models/DB");

const getPosts = async (req, res, next) => {
  const allMessages = await DB.Message.getMessages();

  res.status(200).json({
    posts: allMessages,
  });
};

const postPost = async (req, res, next) => {
  const title = req.body.title;
  const imgUrl = req.body.imgUrl;
  const content = req.body.content;

  console.log(title);
  console.log(imgUrl)
  console.log(content);

  // const newMessage = new DB.Message({
  //   title: title,
  //   imgUrl: "duck.webp",
  //   content: content,
  //   creator: {
  //     name: "Aras",
  //   },
  // });

  // try {
  //   const createdMessage = await newMessage.createMessage();

  //   res.status(201).json({
  //     message: "Post created!",
  //     post: {
  //       _id: createdMessage._id,
  //       title: createdMessage.messageTitle,
  //       content: createdMessage.messageContent,
  //       creator: createdMessage.messageCreator,
  //       createdAt: createdMessage.createdAt,
  //     },
  //   });
  // } catch (err) {
  //   next(err);
  // }
};

module.exports = { getPosts, postPost };
