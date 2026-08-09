import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../../api/api";
import "./clients.css";

export default function ClientDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [client, setClient] = useState(null);

  useEffect(
    function () {
      api
        .get("/clients/" + id)
        .then((response) => {
          setClient(response.data);
        })
        .catch((error) => {
          console.log("Erreur :", error);
        });
    },
    [id]
  );

  if (client === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="client-details-page">
      <h2>Client details</h2>

      <div className="details-info">
        <p>
          <strong>ID:</strong> {client.id}
        </p>

        <p>
          <strong>Name:</strong> {client.nom}
        </p>

        <p>
          <strong>Email:</strong> {client.email}
        </p>

        <p>
          <strong>Phone:</strong> {client.telephone}
        </p>

        <p>
          <strong>City:</strong> {client.ville}
        </p>
      </div>

      <button
        type="button"
        aria-label="Retour à la liste des clients"
        onClick={() => {
          navigate("/clients");
        }}
      >
        <ArrowBackIcon />
      </button>
    </div>
  );
}
