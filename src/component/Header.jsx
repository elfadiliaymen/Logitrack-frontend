import React from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getUser } from "./token";

export default function Header({ onToggleMenu }) {
  const navigate = useNavigate();

  const user = getUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <header>
      <button type="button" aria-label="menu" onClick={onToggleMenu}>
        ☰
      </button>

      <h1>LogiTrack</h1>

      {user && (
        <span>
          {user.prenom} {user.nom}
        </span>
      )}

      <button type="button" aria-label="logout" onClick={handleLogout}>
        Déconnexion
      </button>
    </header>
  );
}
