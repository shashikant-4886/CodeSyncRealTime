import { Server } from "socket.io";
import app from "./app.js";
import { PORT } from "./config.js";
import http from "http";
const server = http.createServer(app);

const IO = new Server(server);

IO.on("connection", (socket) => {
  console.log("Socket Connected", socket.id);


});

server.listen(PORT, () => {
  console.log(`Server Start on http://localhost:${PORT}`);
});
