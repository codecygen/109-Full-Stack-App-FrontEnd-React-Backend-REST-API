const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ errorMessage: message });
};

module.exports = errorMiddleware;
