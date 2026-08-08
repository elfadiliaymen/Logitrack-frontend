import React from "react";
import { getUser, getClaims } from "../component/token";
import "./pages.css";

export default function Profile() {
  const user = getUser();
  const claims = getClaims();

  if (!user) {
    return <p>Aucun utilisateur connecté</p>;
  }

  return (
    <div className="page-profile">
      <h2>Mon profil</h2>

      <div className="profile-info">
        <p>ID : {claims ? claims.id : null}</p>
        <p>Username : {claims ? claims.username : user.username}</p>
        <p>Nom : {user.nom}</p>
        <p>Prénom : {user.prenom}</p>
        <p>Email : {user.email}</p>
        <p>Rôle : {claims ? claims.role : user.role}</p>
      </div>
    </div>
  );
}
