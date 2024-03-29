const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");

require("dotenv").config();
const { initIO } = require("./sockets/socket");

const feedRoutes = require("./routes/feedRoutes");
const userRoutes = require("./routes/userRoutes");

const DB = require("./models/DB");
const corsMiddleware = require("./middleware/corsMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

app.use(corsMiddleware);

// REST API deals with JSON data, don't use it.
// app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));

// so localhost:4000/uploads/img.jpg will be the actual path
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/feed", feedRoutes);
app.use("/auth", userRoutes);

// Always keep error middleware in the end of the app
app.use(errorMiddleware);

const SERVER_PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGODB_URL)
  .then((result) => {
    // websocket-server-establishment
    const nodeServer = app.listen(SERVER_PORT, () => {
      console.log(`Server started on port ${SERVER_PORT}`);
    });

    // websocket-server-establishment
    initIO(nodeServer);

    // find guest user when server initializes
    // this user will be used for comment section
    // it will allow guests to comment on stuff.
    return DB.User.findUserWithName("guest");
  })
  .then((foundGuestUser) => {
    if (!foundGuestUser) {
      // if guest user cannot be found
      // create it
      DB.User.createGuestUser();
    }
  })
  .catch((err) => {
    console.error(err);
  });
