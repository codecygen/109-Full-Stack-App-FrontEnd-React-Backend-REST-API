const { validationResult, check } = require("express-validator");

const validateLoginInput = async (req, res, next) => {
  try {
    const inputList = [
      check("email")
        .notEmpty()
        .withMessage("Email field cannot be empty for login!")
        .bail()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Not the correct email format for login!"),
      check("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Min 6 characters needed for password in login!")
        .bail()
        .isString()
        .escape()
        .withMessage("Not the correct password format for login!"),
    ];

    await Promise.all(inputList.map((input) => input.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const loginValidationError = new Error("Login input validation error!");
      loginValidationError.inputErrors = errors.array();
      loginValidationError.statusCode = 422;
      throw loginValidationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateLoginInput;
