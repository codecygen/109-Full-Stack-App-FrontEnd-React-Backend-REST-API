const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const validateSignupInput = require("../middleware/validateSignupInput");
const validateLoginInput = require("../middleware/validateLoginInput");

router.put("/signup", validateSignupInput, userController.signup);

router.post("/login", validateLoginInput, userController.login);

module.exports = router;
