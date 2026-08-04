import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error:", err));
  }, []);

  const getStatus = (order) =>
    order?.statut ?? order?.status ?? order?.etat ?? "N/A";

  const getClientName = (order) =>
    order?.client?.nom ?? order?.client?.name ?? order?.clientName ?? "N/A";

  return (
    <div>
      <h2>List of orders</h2>

      {orders.length === 0 ? (
        <p>No order found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{getClientName(order)}</td>
                <td>{getStatus(order)}</td>
                <td>
                  <button onClick={() => navigate(`/orders/${order.id}`)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}