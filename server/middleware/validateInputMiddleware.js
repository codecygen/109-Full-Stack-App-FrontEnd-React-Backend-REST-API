const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const validateInputMiddleware = async (req, res, next) => {
  try {
    const inputs = [
      check("title")
        .trim()
        .isLength({ min: 6 })
        .escape()
        .withMessage("Not the correct title!"),
      check("details")
        .trim()
        .isLength({ min: 6 })
        .escape()
        .withMessage("Not the correct details!"),
    ];

    await Promise.all(inputs.map((input) => input.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("Input validation error!");;
      validationError.inputErrors = errors.array();
      validationError.statusCode = 422;
      throw validationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateInputMiddleware;
