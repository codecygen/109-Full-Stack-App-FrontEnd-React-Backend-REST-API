const express = require("express");
const app = express();

const mongoose = require("mongoose");

require("dotenv").config();

const feedRoutes = require("./routes/feedRoutes");

// CORS Error Prevention
app.use((req, res, next) => {
  // Allow to communicate from any origin
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Allow to send any request
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  // Allow to set a content type with fetch request
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  next();
});

// REST API deals with JSON data, don't use it.
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

app.use("/feed", feedRoutes);

const SERVER_PORT = 4000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    app.listen(SERVER_PORT, () => {
      console.log(`Server started on port ${SERVER_PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
