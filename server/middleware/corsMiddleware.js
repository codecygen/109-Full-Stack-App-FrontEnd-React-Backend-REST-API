// CORS-Error-Prevention
const corsMiddleware = (req, res, next) => {
  // Allow to communicate from any origin
  res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL);
  // Allow to send any request
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // Allow to set a content type with fetch request
  // Authentication-and-Authorization-Backend
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
};

module.exports = corsMiddleware;
