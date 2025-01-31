import { Server } from "socket.io";
import app from "./app.js";
import { PORT, SOCKET_ACTIONS } from "./config.js";
import http from "http";
const server = http.createServer(app);

const IO = new Server(server);

const userSocketMap = {};
const codeSocketMap = {};

const getAllConnectedClients = (room_id) => {
  return Array.from(IO.sockets.adapter.rooms.get(room_id) || []).map(
    (socket_id) => {
      return {
        socket_id,
        userName: userSocketMap[socket_id],
      };
    }
  );
};

IO.on("connection", (socket) => {
  // console.log("Socket Connected", socket.id);

  socket.on(SOCKET_ACTIONS.JOIN, ({ room_id, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(room_id);
    const clients = getAllConnectedClients(room_id);

    // console.log("clients", clients);

    for (let client of clients) {
      IO.to(client.socket_id).emit(SOCKET_ACTIONS.JOINED, {
        clients,
        userName: userName,
        socketId: socket.id,
      });
    }
  });

  socket.on(SOCKET_ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    codeSocketMap[roomId] = code;
    socket.in(roomId).emit(SOCKET_ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(SOCKET_ACTIONS.SYNC_CODE, ({ room_id, socket_id }) => {
    IO.to(socket_id).emit(SOCKET_ACTIONS.CODE_CHANGE, {
      code: codeSocketMap[room_id],
    });
  });

  socket.on("disconnecting", ({ roomId }) => {
    const rooms = [...socket.rooms];

    for (let room_id of rooms) {
      socket.in(room_id).emit(SOCKET_ACTIONS.DISCONNECTED, {
        socket_id: socket.id,
        userName: userSocketMap[socket.id],
      });
    }

    delete userSocketMap[socket.id];
    socket.leave();
  });
});

server.listen(PORT, () => {
  console.log(`Server Start on http://localhost:${PORT}`);
});
