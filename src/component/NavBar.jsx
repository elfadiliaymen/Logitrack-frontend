import React from "react";
import { Link } from "react-router-dom";
import { getRole } from "./token";

export default function NavBar({ open }) {
  const role = getRole();

  return (
    <nav className={"sidebar" + (open ? "" : " closed")}>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/clients">Clients</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/products">Products</Link></li>
        {role === "ADMIN" && <li><Link to="/users">Users</Link></li>}
      </ul>
    </nav>
  );
}
