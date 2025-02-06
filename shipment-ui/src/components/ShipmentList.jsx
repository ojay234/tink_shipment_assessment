import ShipmentItem from "./ShipmentItem.jsx";

const ShipmentList = ({ shipments }) => {
  return (
    <div className="shipment-list">
      {shipments.length === 0 ? (
        <p>No shipments yet.</p>
      ) : (
        shipments.map((shipment) => (
          <ShipmentItem key={shipment.id} shipment={shipment} />
        ))
      )}
    </div>
  );
};

export default ShipmentList;
