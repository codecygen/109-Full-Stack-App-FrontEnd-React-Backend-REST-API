const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validateSignupInput = require("../middleware/validateSignupInput");

router.put("/signup", validateSignupInput, userController.signup);

module.exports = router;
