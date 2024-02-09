const { validationResult, check } = require("express-validator");
const DB = require("../models/DB");

const validateSignupInput = async (req, res, next) => {
  try {
    const inputList = [
      check("email")
        .notEmpty()
        .withMessage("Email field cannot be empty for login!")
        .bail()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Not the correct email format for signup!")
        .bail()
        .custom(async (value, { req }) => {
          const email = value;
          const foundUser = await DB.User.findUserWithEmail(email);

          if (foundUser) {
            throw new Error(
              "Email address already exists in database for signup!"
            );
          }

          return true;
        }),
      check("name")
        .trim()
        .isLength({ min: 4 })
        .isString()
        .escape()
        .withMessage("Not the correct name format for signup!")
        .bail()
        .custom(async (value, { req }) => {
          const name = value;
          const foundUser = await DB.User.findUserWithName(name);

          if (foundUser) {
            throw new Error("Username already exists in database for signup!");
          }

          return true;
        }),
      check("password")
        .trim()
        .isLength({ min: 6 })
        .isString()
        .escape()
        .withMessage("Not the correct password format for signup!"),
    ];

    await Promise.all(inputList.map((input) => input.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const signupValidationError = new Error("Signup input validation error!");
      signupValidationError.inputErrors = errors.array();
      signupValidationError.statusCode = 422;
      throw signupValidationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateSignupInput;
