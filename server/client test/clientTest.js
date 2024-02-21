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
  console.log("Received message from server:", data); // Print the received message
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
  headers: {
    "Content-Type": "application/json", // Set the Content-Type header
  },
};

// Define the data to be sent in the HTTP request
const data = JSON.stringify({
  token: "vahitaras@gmail.com", // Set the token value
  comment: "This is a dummy comment!",
});

// Log the request data
console.log("Request Data:", data);

// Make the HTTP request
const req = http.request(options, (res) => {
  console.log(`Status code: ${res.statusCode}`);

  // Accumulate the response data
  let responseData = "";

  res.on("data", (chunk) => {
    responseData += chunk;
  });

  // When the response ends, parse and log the data
  res.on("end", () => {
    try {
      const responseDataObj = JSON.parse(responseData); // Assuming the response is JSON data
      console.log("Response:", responseDataObj);
    } catch (error) {
      console.error("Error parsing response:", error);
    }
  });
});

// Handle errors
req.on("error", (error) => {
  console.error("Error:", error);
});

// Send the request data
req.write(data);

// End the request
req.end();
