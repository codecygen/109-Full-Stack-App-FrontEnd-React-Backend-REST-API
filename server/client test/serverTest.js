const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Listen for incoming socket connections
io.on("connection", (socket) => {
  console.log("A client connected");

  // Listen for "message" events from clients
  socket.on("message", (data) => {
    console.log("Received message from client:", data);
    
    // Emit a message back to the client
    socket.emit("message", { message: "Hello from server!" });
  });

  // Listen for disconnect events
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
