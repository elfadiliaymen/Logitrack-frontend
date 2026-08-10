import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";
import Pagination from "@mui/material/Pagination";
import "../pages.css";
import "./users.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function loadUsers() {
    api
      .get("/users", {
        params: {
          page: page,
          size: 7,
          nom: search || undefined,
        },
      })
      .then((response) => {
        setUsers(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadUsers, [page, search]);

  function handleDelete(userId) {
    if (!window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      return;
    }

    api
      .delete("/users/" + userId)
      .then(loadUsers)
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="page-users">
      <h2>Liste des utilisateurs</h2>

      <div className="toolbar">
        <button
          type="button"
          aria-label="Ajouter un utilisateur"
          onClick={() => {
            navigate("/users/new");
          }}
        >
          <AddIcon />
        </button>

        <input
          type="text"
          placeholder="Rechercher par nom"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(0);
          }}
        />
      </div>

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
              <th>Actions</th>
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

                  <td>
                    <button
                      type="button"
                      aria-label="Voir l'utilisateur"
                      onClick={() => {
                        navigate("/users/" + user.id);
                      }}
                    >
                      <VisibilityIcon />
                    </button>

                    <button
                      type="button"
                      aria-label="Modifier l'utilisateur"
                      onClick={() => {
                        navigate("/users/" + user.id + "/edit");
                      }}
                    >
                      <EditIcon />
                    </button>

                    <button
                      type="button"
                      aria-label="Supprimer l'utilisateur"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
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
