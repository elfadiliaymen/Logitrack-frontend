import React from "react";
import { Link } from "react-router-dom";
import "./component.css";

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h2>404 - Page introuvable</h2>
      <p>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link to="/dashboard">Retour au tableau de bord</Link>
    </div>
  );
}
