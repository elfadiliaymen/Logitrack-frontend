import React from "react";
import { useNavigate } from "react-router-dom";
import { clearSession, getUser } from "./token";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header({ onToggleMenu }) {
  const navigate = useNavigate();

  const user = getUser();

  function handleLogout() {
    clearSession();
    navigate("/login");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onToggleMenu}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LogiTrack
        </Typography>

        {user && (
          <Typography sx={{ mr: 2 }}>
            {user.prenom} {user.nom}
          </Typography>
        )}

        <IconButton color="inherit" onClick={handleLogout} aria-label="logout">
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
