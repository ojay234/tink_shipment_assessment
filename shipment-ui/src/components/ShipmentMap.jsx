import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ShipmentMap = ({ shipments }) => {
  const center = [9.05785, 7.49508]; // Default center (Abuja)

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {shipments.map((shipment) => (
        <Marker
          key={shipment.id}
          position={[shipment.location.lat, shipment.location.lng]}
        >
          <Popup>
            <strong>{shipment.name}</strong>
            <br />
            Status: {shipment.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ShipmentMap;
