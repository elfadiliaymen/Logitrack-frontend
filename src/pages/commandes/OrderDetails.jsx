import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  const getStatus = (orderItem) =>
    orderItem?.statut ?? orderItem?.status ?? orderItem?.etat ?? "N/A";

  const getClientName = (orderItem) =>
    orderItem?.client?.nom ?? orderItem?.client?.name ?? orderItem?.clientName ?? "N/A";

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order details</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Client:</strong> {getClientName(order)}</p>
      <p><strong>Status:</strong> {getStatus(order)}</p>

      <button onClick={() => navigate("/orders")}>Back</button>
    </div>
  );
}