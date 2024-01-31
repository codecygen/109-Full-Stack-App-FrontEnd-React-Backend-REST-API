const { validationResult, check } = require("express-validator");

const validateSignupInput = async (req, res, next) => {
  try {
    const inputList = [
      check("email")
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .escape()
        .withMessage("Not the correct email format!"),
      check("name")
        .notEmpty()
        .isString()
        .trim()
        .escape()
        .withMessage("Not the correct name format!"),
      check("password")
        .isLength({ min: 8 })
        .isString()
        .trim()
        .escape()
        .withMessage("Not the correct password format!"),
    ];

    await Promise.all(inputList.map((input) => input.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new Error("Signup input validation error!");;
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
