const { validationResult } = require("express-validator");
const { check } = require("express-validator");

const validateInput = async (req, res, next) => {
  const inputs = [
    check("title")
      .trim()
      .isLength({ min: 6 })
      .escape()
      .withMessage("Not the correct title!"),
    check("content")
      .trim()
      .isLength({ min: 6 })
      .escape()
      .withMessage("Not the correct content!"),
  ];

  await Promise.all(inputs.map((input) => input.run(req)));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(402).json({ errors: errors.array() });
  }

  next();
};

module.exports = validateInput;
