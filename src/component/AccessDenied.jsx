import React from "react";
import { Link } from "react-router-dom";

export default function AccessDenied() {
  return (
    <div>
      <h2>Accès refusé</h2>
      <p>
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
}
