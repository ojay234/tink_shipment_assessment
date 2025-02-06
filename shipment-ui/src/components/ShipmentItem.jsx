const ShipmentItem = ({ shipment }) => {
  return (
    <div className="shipment-item">
      <h3>{shipment.name}</h3>

      <p>Status: {shipment.status}</p>
      <p>Last Updated: {new Date(shipment.updatedAt).toLocaleString()}</p>
    </div>
  );
};

export default ShipmentItem;
