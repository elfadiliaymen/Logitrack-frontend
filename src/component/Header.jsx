import React from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getUser } from "./token";

export default function Header() {
  const navigate = useNavigate();

  const user = getUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <h1>LogiTrack</h1>

      <div className="app-header-actions">
        {user && (
          <span>
            {user.prenom} {user.nom}
          </span>
        )}

        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </header>
  );
}
