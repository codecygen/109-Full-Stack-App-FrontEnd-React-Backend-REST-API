// Connect to your Socket.IO server
const socket = io("http://localhost:4000"); // Replace with your actual server URL

// Listen for connection events
socket.on("connect", () => {
  console.log("Connected to server");
});

// Listen for the "message" event from the server
socket.on("comments", (data) => {
  console.log("Received message from server:", data); // Print the received message
});

// Make the HTTP request using Axios
async function sendPostRequest() {
  try {
    const data = {
      token: "vahitaras2@gmail.com", // Set the token value
      comment: "This is a dummy comment!",
    };

    const response = await axios.post(
      "http://localhost:4000/feed/post/65d3aa0e2afddb237cdd3383/comments",
      data,
      {
        headers: {
          "Content-Type": "application/json", // Set the Content-Type header
        },
      }
    );

    console.log("Status code:", response.status);
    console.log("Response:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Make a GET request to the backend endpoint
async function getRequest() {
  try {
    console.log("Making GET request...");

    const response = await axios.get(
      "http://localhost:4000/feed/post/65d3aa0e2afddb237cdd3383/comments",
    );

    document.getElementById("response").textContent = JSON.stringify(
      response.data
    );
  } catch (error) {
    console.error("Error making GET request:", error.message);
  }
}
