const io = require("socket.io-client");
const http = require("http");

// Connect to your Socket.IO server
const socket = io("http://localhost:4000"); // Replace with your actual server URL

// Listen for connection events
socket.on("connect", () => {
  console.log("Connected to server");
});

// Listen for the "message" event from the server
socket.on("message", (data) => {
  console.log("Received message from server:", data.comment); // Print the received message
});

// Emit a message to the server
socket.emit("message", { message: "Hello from client!" });

// Listen for disconnect events
socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

// ==============================================================

// Define the options for the HTTP request
const options = {
  hostname: "localhost",
  port: 4000,
  path: "/feed/post/65d3aa0e2afddb237cdd3383/comments", // Replace with the actual endpoint on your backend server
  method: "POST", // or 'POST', 'PUT', etc. depending on your backend API
};

// Make the HTTP request
const req = http.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  // Accumulate the response data
  let data = "";
  res.on("data", (chunk) => {
    data += chunk;
  });

  // When the response ends, parse and log the data
  res.on("end", () => {
    console.log("Response:", data);
  });
});

// Handle errors
req.on("error", (error) => {
  console.error("Error:", error);
});

// End the request
req.end();
