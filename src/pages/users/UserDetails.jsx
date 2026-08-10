import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../../api/api";
import "./users.css";

export default function UserDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(
    function () {
      api
        .get("/users/" + id)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log("Erreur :", error);
        });
    },
    [id]
  );

  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="user-details-page">
      <h2>Détails de l'utilisateur</h2>

      <div className="details-info">
        <p>
          <strong>ID:</strong> {user.id}
        </p>

        <p>
          <strong>Username:</strong> {user.username}
        </p>

        <p>
          <strong>Nom:</strong> {user.nom}
        </p>

        <p>
          <strong>Prénom:</strong> {user.prenom}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Rôle:</strong> {user.role}
        </p>
      </div>

      <button
        type="button"
        aria-label="Retour à la liste des utilisateurs"
        onClick={() => {
          navigate("/users");
        }}
      >
        <ArrowBackIcon />
      </button>
    </div>
  );
}
