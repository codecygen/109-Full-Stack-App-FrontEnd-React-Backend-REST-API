const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const validateMessageInput = require("../middleware/validateMessageInput");

// Authentication-and-Authorization-Backend
const validateAuth = require("../middleware/validateAuth");
const postChangeAuthorization = require("../middleware/postChangeAuthorization");

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

// Make a comment underneath a post with socket.io
router.post("/post/:postId/comments", feedController.postComment);

module.exports = router;
