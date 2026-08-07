import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "@mui/material/Button";

export default function ClientDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [client, setClient] = useState(null);

  useEffect(function () {

    api.get("/clients/" + id)
      .then(function (response) {
        setClient(response.data);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });

  }, [id]);

  if (client === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>

      <h2>Client details</h2>

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

      <Button
        variant="outlined"
        onClick={function () {
          navigate("/clients");
        }}
      >
        Back
      </Button>

    </div>
  );
}
