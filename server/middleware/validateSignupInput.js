const { validationResult, check } = require("express-validator");

const validateSignupInput = async (req, res, next) => {
  try {
    const inputs = [
      check("email")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("Not the correct email!"),
      check("name")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("Not the correct name!"),
      check("password")
        .not()
        .isEmpty()
        .trim()
        .escape()
        .withMessage("Not the correct password!"),
    ];

    await Promise.all(inputs.map((input) => input.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Input validation error!");
      validationError.statusCode = 422;
      throw validationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateSignupInput;
