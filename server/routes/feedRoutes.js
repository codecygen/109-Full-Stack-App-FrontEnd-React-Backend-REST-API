const express = require("express");
const router = express.Router();

const feedController = require("../controllers/feedController");
const validateMessageInput = require("../middleware/validateMessageInput");

const fileUploadConfig = require("../config/fileUploadConfig");

router.get("/posts", feedController.getPosts);
router.post(
  "/post",
  fileUploadConfig.single("image"),
  validateMessageInput,
  feedController.postPost
);

router.get("/post/:postId", feedController.getPost);
router.delete("/delete/:postId", feedController.deletePost);

router.put(
  "/update/:postId",
  fileUploadConfig.single("image"),
  validateMessageInput,
  feedController.updatePost
);

module.exports = router;
