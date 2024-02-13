const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const validateMessageInput = require("../middleware/validateMessageInput");

// Authentication-and-Authorization-Backend
const validateAuth = require("../middleware/validateAuth");

const fileUploadConfig = require("../config/fileUploadConfig");

// Authentication-and-Authorization-Backend
router.get("/posts", validateAuth, feedController.getPosts);

router.post(
  "/post",
  fileUploadConfig.single("image"),
  validateMessageInput,
  validateAuth,
  feedController.postPost
);

router.get("/post/:postId", feedController.getPost);
router.delete("/delete/:postId", feedController.deletePost);

router.put(
  "/update/:postId",
  fileUploadConfig.single("image"),
  validateMessageInput,
  validateAuth,
  feedController.updatePost
);

module.exports = router;
