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

const postPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  res.status(201).json({
    message: "Post created!",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: {
        name: "Aras",
      },
      createdAt: new Date(),
    },
  });
};

module.exports = { getPosts, postPost };
