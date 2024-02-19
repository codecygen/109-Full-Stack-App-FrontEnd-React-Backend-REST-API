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
