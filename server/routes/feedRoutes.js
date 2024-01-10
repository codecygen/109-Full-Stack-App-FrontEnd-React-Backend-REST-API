const express = require("express");
const router = express.Router();

const validateInputMiddleware = require("../middleware/validateInputMiddleware");

const feedController = require("../controllers/feedController");

router.get("/posts", feedController.getPosts);
router.post("/posts", validateInputMiddleware, feedController.postPost);

router.get("/post/:postId", feedController.getPost);
router.get("/delete/:postId", feedController.deletePost);

module.exports = router;
