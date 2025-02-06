import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import ShipmentList from "./components/ShipmentList";
import ShipmentMap from "./components/ShipmentMap";
import Header from "./components/Header";
import dummyShipments from "./dummyShipments";
import "./app.css";

const socket = io("http://localhost:4000");

function App() {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    setShipments(dummyShipments);

    socket.on("shipmentUpdate", (newShipment) => {
      setShipments((prevShipments) => [newShipment, ...prevShipments]);
    });

    return () => socket.off("shipmentUpdate");
  }, []);
  return (
    <div className="app-container">
      <Header />
      <ShipmentMap shipments={dummyShipments} />
      <ShipmentList shipments={shipments} />
    </div>
  );
}

export default App;
