import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import api from "../../api/api";
import { getRole } from "../../component/token";
import Pagination from "@mui/material/Pagination";
import "./clients.css";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadClients() {
    api
      .get("/clients", {
        params: {
          page: page,
          size: 10,
          sort: "nom," + sortDir,
          nom: search || undefined,
        },
      })
      .then((response)=> {
        setClients(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadClients, [page, sortDir, search]);

  function handleSort() {
    setSortDir(sortDir === "asc" ? "desc" : "asc");
    setPage(0);
  }

  function handleDelete(clientId) {
    if (!window.confirm("Voulez-vous vraiment supprimer ce client ?")) {
      return;
    }

    api
      .delete("/clients/" + clientId)
      .then(loadClients)
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="clients-page">
      <h2>List of clients</h2>

      <div className="toolbar">
        <button
          type="button"
          aria-label="Ajouter un client"
          onClick={() => {
            navigate("/clients/new");
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

      {clients.length === 0 ? (
        <p>No client found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>

              <th>
                <button
                  type="button"
                  onClick={handleSort}
                >
                  Name {sortDir === "asc" ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />}
                </button>
              </th>

              <th>Email</th>

              <th>Phone</th>

              <th>City</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => {
              return (
                <tr key={client.id}>
                  <td>{client.id}</td>

                  <td>{client.nom}</td>

                  <td>{client.email}</td>

                  <td>{client.telephone}</td>

                  <td>{client.ville}</td>

                  <td>
                    <button
                      type="button"
                      aria-label="Voir le client"
                      onClick={() => {
                        navigate("/clients/" + client.id);
                      }}
                    >
                      <VisibilityIcon />
                    </button>

                    {canEdit && (
                      <button
                        type="button"
                        aria-label="Modifier le client"
                        onClick={() => {
                          navigate("/clients/" + client.id + "/edit");
                        }}
                      >
                        <EditIcon />
                      </button>
                    )}

                    {canDelete && (
                      <button
                        type="button"
                        aria-label="Supprimer le client"
                        onClick={() => {
                          handleDelete(client.id);
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    )}
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
