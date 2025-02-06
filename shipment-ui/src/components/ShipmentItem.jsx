const calculateDistance = (loc1, loc2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371; // Earth's radius in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLng = toRad(loc2.lng - loc1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(loc1.lat)) *
      Math.cos(toRad(loc2.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

const ShipmentItem = ({ shipment }) => {
  const distance = calculateDistance(shipment.location, shipment.destination);
  // const totalDistance = 10; // Assume total distance for simplicity
  // const progress = Math.min(
  //   ((totalDistance - distance) / totalDistance) * 100,
  //   100
  // );

  return (
    <div className="shipment-item">
      <h3>{shipment.name}</h3>
      <p>Status: {shipment.status}</p>
      <p>Last Updated: {new Date(shipment.updatedAt).toLocaleString()}</p>
      <p>Distance to Destination: {distance.toFixed(2)} km</p>
      {/* <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div> */}
    </div>
  );
};

export default ShipmentItem;
