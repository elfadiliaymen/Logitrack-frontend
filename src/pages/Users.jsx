import React, { useEffect, useState } from "react";
import api from "../api/api";
import Pagination from "@mui/material/Pagination";

export default function Users() {
  const [users, setUsers] = useState([]);

  function loadUsers() {
    api
      .get("/users")
      .then(function (response) {
        setUsers(
          Array.isArray(response.data)
            ? response.data
            : (response.data && response.data.content) || []
        );
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadUsers, []);

  return (
    <div>
      <h2>Liste des utilisateurs</h2>

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôle</th>
            </tr>
          </thead>

          <tbody>
            {users.map(function (user) {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.username}</td>

                  <td>
                    {user.prenom} {user.nom}
                  </td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div>
        <Pagination count={10} />
      </div>
    </div>
  );
}
