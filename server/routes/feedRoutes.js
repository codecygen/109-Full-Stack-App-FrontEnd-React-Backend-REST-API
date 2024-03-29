const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const validateMessageInput = require("../middleware/validateMessageInput");

// Authentication-and-Authorization-Backend
const validateAuth = require("../middleware/validateAuth");
const postChangeAuthorization = require("../middleware/postChangeAuthorization");
const commentChangeAuthorization = require("../middleware/commentChangeAuthorization");

const fileUploadConfig = require("../config/fileUploadConfig");

// Authentication-and-Authorization-Backend
router.get("/posts", feedController.getPosts);

router.post(
  "/post",
  validateAuth,
  fileUploadConfig.single("image"),
  validateMessageInput,
  feedController.postPost
);

router.get("/post/:postId", feedController.getPost);
router.delete(
  "/delete/:postId",
  validateAuth,
  postChangeAuthorization,
  feedController.deletePost
);

router.put(
  "/update/:postId",
  validateAuth,
  postChangeAuthorization,
  fileUploadConfig.single("image"),
  validateMessageInput,
  feedController.updatePost
);

// Make all comments underneath a post with socket.io
router.get("/post/:postId/comments", feedController.getComments);
// Make a comment underneath a post with socket.io
router.post("/post/:postId/comments", feedController.postComment);

router.delete(
  "/post/:postId/comment",
  validateAuth,
  commentChangeAuthorization,
  feedController.deleteComment
);

router.put(
  "/post/:postId/comment",
  validateAuth,
  commentChangeAuthorization,
  feedController.updateComment
);

module.exports = router;
