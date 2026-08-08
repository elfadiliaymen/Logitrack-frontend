import React from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { clearSession, getUser } from "./token";
import "./component.css";

export default function Header({ onToggleMenu }) {
  const navigate = useNavigate();

  const user = getUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <div className="header-group">
        <button type="button" aria-label="menu" onClick={onToggleMenu}>
          <MenuIcon />
        </button>

        <h1>LogiTrack</h1>
      </div>

      <div className="header-group">
        {user && (
          <span className="header-user">
            <AccountCircleIcon />
            {user.prenom} {user.nom}
          </span>
        )}

        <button type="button" aria-label="logout" onClick={handleLogout}>
          <LogoutIcon />
          Déconnexion
        </button>
      </div>
    </header>
  );
}
