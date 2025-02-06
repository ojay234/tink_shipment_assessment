const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const generateShipment = () => ({
  id: Math.random().toString(36).substring(7),
  name: `Shipment #${Math.floor(Math.random() * 1000)}`,
  status: ["In Transit", "Delivered", "Delayed"][Math.floor(Math.random() * 3)],
  updatedAt: new Date(),
  location: {
    lat: 9.05785 + (Math.random() - 0.5) * 0.1,
    lng: 7.49508 + (Math.random() - 0.5) * 0.1,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  setInterval(() => {
    const newShipment = generateShipment();
    socket.emit("shipmentUpdate", newShipment);
  }, 5000);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(4000, () => {
  console.log("WebSocket server running on port 4000");
});
