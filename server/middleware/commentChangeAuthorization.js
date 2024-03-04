const { ObjectId } = require("mongodb");
const DB = require("../models/DB");

const commentChangeAuthorization = async (req, res, next) => {
  try {
    const commentId = new ObjectId(req.body.commentId);
    const requestorId = new ObjectId(req.userId);
    const requestorEmail = req.userEmail;

    const foundComment = await DB.Comment.getComment(commentId);

    const adminEmails = process.env.ADMIN_EMAILS.split(",");
    const commentOwnerId = foundComment.userId;

    // Check if the person who is editing either admin or the post owner
    if (
      !requestorId.equals(commentOwnerId) &&
      !adminEmails.includes(requestorEmail)
    ) {
      const authorizationError = new Error(
        "You are not allowed to delete this comment!"
      );
      authorizationError.statusCode = 401;
      throw authorizationError;
    }

    req.foundComment = foundComment;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = commentChangeAuthorization;
