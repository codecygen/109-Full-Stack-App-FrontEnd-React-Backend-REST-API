// Authentication-and-Authorization-Backend
const jwt = require("jsonwebtoken");

const validateAuth = (req, res, next) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      const authenticationError = new Error("Not authenticated!");
      authenticationError.statusCode = 401;
      throw authenticationError;
    }

    req.userId = decodedToken._id;
    next();
  } catch (err) {
    err.statusCode = 500;
    next(err);
  }
};

module.exports = validateAuth;
