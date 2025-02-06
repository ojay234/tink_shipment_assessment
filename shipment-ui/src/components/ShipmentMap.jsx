import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

const ShipmentMap = ({ shipments }) => {
  const center = [9.05785, 7.49508]; // Default center (Abuja)

  return (
    <MapContainer
      center={center}
      zoom={6}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {shipments.map((shipment) => (
        <>
          <Marker
            key={`${shipment.id}-loc`}
            position={[shipment.location.lat, shipment.location.lng]}
          >
            <Popup>
              <strong>{shipment.name}</strong>
              <br />
              Status: {shipment.status}
            </Popup>
          </Marker>
          <Marker
            key={`${shipment.id}-dest`}
            position={[shipment.destination.lat, shipment.destination.lng]}
            color="green"
          >
            <Popup>
              <strong>{shipment.name} Destination</strong>
            </Popup>
          </Marker>
          <Polyline
            positions={[
              [shipment.location.lat, shipment.location.lng],
              [shipment.destination.lat, shipment.destination.lng],
            ]}
            color="blue"
          />
        </>
      ))}
    </MapContainer>
  );
};

export default ShipmentMap;
