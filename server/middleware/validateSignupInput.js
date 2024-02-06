const { validationResult, check } = require("express-validator");
const DB = require("../models/DB");

const validateSignupInput = async (req, res, next) => {
  try {
    const inputList = [
      check("email")
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Not the correct email format!")
        .bail()
        .custom(async (value, { req }) => {
          const email = value;
          const foundUser = await DB.User.findUserWithEmail(email);

          if (foundUser) {
            throw new Error("Email Address already exists in database!");
          }

          return true;
        }),
      check("name")
        .isLength({ min: 4 })
        .isString()
        .trim()
        .escape()
        .withMessage("Not the correct name format!")
        .bail()
        .custom(async (value, { req }) => {
          const name = value;
          const foundUser = await DB.User.findUserWithName(name);

          if (foundUser) {
            throw new Error("Username already exists in database!");
          }

          return true;
        }),
      check("password")
        .isLength({ min: 6 })
        .isString()
        .trim()
        .escape()
        .withMessage("Not the correct password format!"),
    ];

    await Promise.all(inputList.map((input) => input.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new Error("Signup input validation error!");
      validationError.inputErrors = errors.array();
      validationError.statusCode = 422;
      throw validationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateSignupInput;
