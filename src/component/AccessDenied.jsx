import React from "react";
import { Link } from "react-router-dom";
import "./component.css";

export default function AccessDenied() {
  return (
    <div className="access-denied-page">
      <h2>Accès refusé</h2>
      <p>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
}
