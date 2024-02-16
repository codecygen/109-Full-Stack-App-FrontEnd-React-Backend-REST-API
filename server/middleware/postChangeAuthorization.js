const DB = require("../models/DB");

const postChangeAuthorization = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const existingPost = await DB.Message.getMessage(postId);

    // Check if post exists in database
    if (!existingPost) {
      const existingPostError = new Error(
        `Post ID ${postId} does not exist in database for updating!`
      );
      existingPostError.statusCode = 500;
      throw existingPostError;
    }

    const adminEmails = process.env.ADMIN_EMAILS.split(",");
    const postOwnerEmail = existingPost.creator.email;
    const requestorEmail = req.userEmail;

    // Check if the person who is editing either admin or the post owner
    if (
      requestorEmail !== postOwnerEmail &&
      !adminEmails.includes(requestorEmail)
    ) {
      const authorizationError = new Error(
        "You are not allowed to edit this post!"
      );
      authorizationError.statusCode = 401;
      throw authorizationError;
    }

    req.existingPost = existingPost;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = postChangeAuthorization;
