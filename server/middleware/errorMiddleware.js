const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const inputErrors = err.inputErrors;

  if (inputErrors) {
    res.status(statusCode).json({ message: message, errors: inputErrors });
  } else {
    res.status(statusCode).json({ message: message });
  }
};

module.exports = errorMiddleware;
