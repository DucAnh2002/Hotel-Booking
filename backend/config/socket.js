const { Server } = require("socket.io");

let io;

module.exports = {
  init: (httpServer) => {
    io = new Server(httpServer, {
      cors: {
        origin: ["http://localhost:3000"], // cấu hình domain FE
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket) => {
      console.log("✅ New client connected:", socket.id);

      // Cho phép BẾP hoặc LỄ TÂN  join vào room riêng
      socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`✅ Client ${socket.id} joined room: ${room}`);
      });
    });
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io chưa được khởi tạo!");
    }
    return io;
  },
};
