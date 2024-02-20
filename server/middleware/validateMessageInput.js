const { validationResult, body } = require("express-validator");

const validateMessageInput = async (req, res, next) => {
  try {
    const inputs = [
      body("title")
        .trim()
        .isLength({ min: 5 })
        .escape()
        .withMessage("Not the correct title!"),
      body("details")
        .trim()
        .isLength({ min: 5 })
        // .escape()
        .withMessage("Not the correct details!"),
    ];

    await Promise.all(inputs.map((input) => input.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const validationError = new Error("New Message Input validation error!");;
      validationError.inputErrors = errors.array();
      validationError.statusCode = 422;
      throw validationError;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateMessageInput;
