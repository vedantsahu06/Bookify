import React, { useState, useEffect } from "react";
import { useFirebase } from "../context/Firebase";

function ViewOrders() {
  const firebase = useFirebase();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!firebase.isLoggedIn) {
      return;
    }

    firebase.viewOrder().then((data) => setOrders(data));
  }, [firebase]);

  console.log(orders);

  return (
    <div>
      <h2>Order View</h2>

      {orders.length>0 ? (
        orders.map((data, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h3>Name: {data.Name}</h3>
            <p>Quantity: {data.quantity}</p>
            <p>Email: {data.userEmail}</p>
            <p>
              Date:{" "}
              {data.orderDate?.toDate
                ? data.orderDate.toDate().toLocaleString()
                : String(data.orderDate)}
            </p>
          </div>
        ))
      ) : (
        <p>Loading orders...</p>
      )}

      {/* ✅ Optional message (renders only visually when array is empty, no condition) */}
      
    </div>
  );
}

export default ViewOrders;
