import React from "react";
import { getUser, getUserId } from "../component/token";

export default function Profile() {
  const user = getUser();
  const id = getUserId();

  if (!user) {
    return <p>Aucun utilisateur connecté</p>;
  }

  return (
    <div>
      <h2>Mon profil</h2>

      <p>ID : {id}</p>
      <p>Username : {user.username}</p>
      <p>Nom : {user.nom}</p>
      <p>Prénom : {user.prenom}</p>
      <p>Email : {user.email}</p>
      <p>Rôle : {user.role}</p>
    </div>
  );
}
