const io = require("socket.io-client");

// Connect to your Socket.IO server
const socket = io("http://localhost:4000"); // Replace with your actual server URL

// Listen for connection events
socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// Listen for the "message" event from the server
socket.on("message", (data) => {
  console.log("Received message from server:", data); // Print the received message
});

// Emit a message to the server
socket.emit("message", { message: "Hello from client!" });

// Disconnect when done
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});
