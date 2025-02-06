const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

const dummyShipments = [
  {
    id: "1",
    name: "Shipment #101",
    status: "In Transit",
    updatedAt: new Date("2025-02-01T10:30:00"),
    location: { lat: 9.05785, lng: 7.49508 }, // Abuja
    destination: { lat: 9.0765, lng: 7.3986 }, // Wuse, Abuja
  },
  {
    id: "2",
    name: "Shipment #102",
    status: "Delivered",
    updatedAt: new Date("2025-02-02T12:00:00"),
    location: { lat: 6.5244, lng: 3.3792 }, // Lagos
    destination: { lat: 6.4654, lng: 3.4064 }, // Victoria Island, Lagos
  },
  {
    id: "3",
    name: "Shipment #103",
    status: "Delayed",
    updatedAt: new Date("2025-02-03T15:45:00"),
    location: { lat: 5.6037, lng: -0.187 }, // Accra, Ghana
    destination: { lat: 5.56, lng: -0.205 }, // Tema, Ghana
  },
  {
    id: "4",
    name: "Shipment #104",
    status: "In Transit",
    updatedAt: new Date("2025-02-04T09:15:00"),
    location: { lat: 8.6753, lng: 4.556 }, // Ilorin
    destination: { lat: 8.5, lng: 4.55 }, // Offa, Kwara
  },
  {
    id: "5",
    name: "Shipment #105",
    status: "Delivered",
    updatedAt: new Date("2025-02-05T18:20:00"),
    location: { lat: 7.3775, lng: 3.947 }, // Ibadan
    destination: { lat: 7.3858, lng: 3.9633 }, // Dugbe, Ibadan
  },
];

const generateShipment = () => {
  return dummyShipments.map((shipment) => {
    // Modify lat and lng randomly
    return {
      ...shipment,
      status: ["In Transit", "Delivered", "Delayed"][
        Math.floor(Math.random() * 3)
      ],
      updatedAt: new Date(),
      location: {
        lat: shipment.location.lat + (Math.random() - 0.5) * 0.1, // Adjust latitude
        lng: shipment.location.lng + (Math.random() - 0.5) * 0.1, // Adjust longitude
      },
      destination: {
        lat: shipment.destination.lat + (Math.random() - 0.5) * 0.1, // Adjust latitude
        lng: shipment.destination.lng + (Math.random() - 0.5) * 0.1, // Adjust longitude
      },
    };
  });
};

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
