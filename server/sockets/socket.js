let io;

// websocket-server-establishment
const initIO = (nodeServer) => {
  io = require("socket.io")(nodeServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    // Connected to socket.io!
    
    // socket.on("message", (data) => {
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
