import React from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { getRole } from "./token";
import "./component.css";

export default function NavBar({ open }) {
  const role = getRole();

  return (
    open && (
      <nav className="app-nav">
        <ul>
          <li>
            <Link to="/dashboard">
              <DashboardIcon />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <PersonIcon />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/clients">
              <PeopleIcon />
              Clients
            </Link>
          </li>
          <li>
            <Link to="/orders">
              <ShoppingCartIcon />
              Orders
            </Link>
          </li>
          <li>
            <Link to="/products">
              <InventoryIcon />
              Products
            </Link>
          </li>
          {role === "ADMIN" && (
            <li>
              <Link to="/users">
                <SupervisorAccountIcon />
                Users
              </Link>
            </li>
          )}
        </ul>
      </nav>
    )
  );
}
