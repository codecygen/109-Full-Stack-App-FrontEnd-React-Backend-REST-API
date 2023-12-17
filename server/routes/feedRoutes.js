const express = require("express");
const router = express.Router();

const validateInput = require("../middleware/validateInput");

const feedController = require("../controllers/feedController");

router.get("/posts", feedController.getPosts);
router.post("/posts", validateInput, feedController.postPost);

module.exports = router;
