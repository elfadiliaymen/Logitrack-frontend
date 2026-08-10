import React, { useEffect, useState } from "react";
import api from "../api/api";
import Pagination from "@mui/material/Pagination";
import "./pages.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page , setPage] = useState(0);
  const [totalPages , setTotalPages] = useState(1);

  function loadUsers() {
    api
      .get("/users" ,
        {params : {
          page : page ,
          size : 7
        }}
      )
      .then(function (response) {
        setUsers(
          Array.isArray(response.data)
            ? response.data
            : (response.data && response.data.content) || []
        );
        setTotalPages(
          Array.isArray(response.data)
            ? 1
            : (response.data && response.data.totalPages) || 1
        );
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadUsers, [page]);

  return (
    <div className="page-users">
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
            {users.map((user) => {
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

      <div className="pagination-row">
        <Pagination 
        count={totalPages} 
        page={page + 1}
         onChange={(event, value) => {
            setPage(value - 1);
          }}
        
        />
      </div>
    </div>
  );
}
