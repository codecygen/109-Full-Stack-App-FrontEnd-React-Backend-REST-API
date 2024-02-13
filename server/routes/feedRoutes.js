const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const validateMessageInput = require("../middleware/validateMessageInput");

// Authentication-and-Authorization-Backend
const validateAuth = require("../middleware/validateAuth");

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
router.delete("/delete/:postId", feedController.deletePost);

router.put(
  "/update/:postId",
  validateAuth,
  fileUploadConfig.single("image"),
  validateMessageInput,
  feedController.updatePost
);

module.exports = router;
