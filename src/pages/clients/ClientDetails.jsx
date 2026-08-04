import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ClientDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => setClient(data))
      .catch((err) => console.error("Error:", err));
  }, [id]);

  if (!client) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Client details</h2>
      <p><strong>ID:</strong> {client.id}</p>
      <p><strong>Name:</strong> {client.nom}</p>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Phone:</strong> {client.telephone}</p>
      <p><strong>City:</strong> {client.ville}</p>

      <button onClick={() => navigate("/clients")}>Back</button>
    </div>
  );
}