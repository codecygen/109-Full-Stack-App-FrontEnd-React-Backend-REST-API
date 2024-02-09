const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validateSignupInput = require("../middleware/validateSignupInput");

router.put("/signup", validateSignupInput, userController.signup);

router.post("/login", userController.login);

module.exports = router;
