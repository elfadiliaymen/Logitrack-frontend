import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./token";

function RouteGuard({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/register" replace />;
  }

  return children;
}

export default RouteGuard;