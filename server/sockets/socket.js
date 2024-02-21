let io;

// websocket-server-establishment
const initIO = (nodeServer) => {
  io = require("socket.io")(nodeServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected to socket.io!");
    // socket.on("message", (data) => {
    //   console.log("Received message from client:", data);

    //   // Emit a message back to the client
    //   socket.emit("message", { message: "Hello from server!" });
    // });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io is not initialized!");
  }
  return io;
};

module.exports = {
  initIO,
  getIO,
};
