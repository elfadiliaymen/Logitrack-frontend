import React from "react";
import { getRole, getUserId, getUser } from "../component/token";

export default function Dashboard() {
  const user = getUser();
  const userId = getUserId();
  const role = getRole();

  return (
    <div>
      <h2>Tableau de bord</h2>
      {user && (
        <p>
          Bienvenue, {user.prenom} {user.nom}
        </p>
      )}
      <p>ID : {userId}</p>
      <p>Rôle : {role}</p>
    </div>
  );
}
