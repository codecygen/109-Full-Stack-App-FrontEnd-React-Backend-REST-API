const errorMiddleware = (err, req, res, next) => {
  console.error(err);
  const errorCode = err.statusCode;
  const errorMessage = err.message;

  res.status(errorCode).json({ message: errorMessage });
};

module.exports = errorMiddleware;
