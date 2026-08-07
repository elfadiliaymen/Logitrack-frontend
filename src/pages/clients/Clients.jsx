import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../component/token";
import Pagination from "@mui/material/Pagination";

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
      .then(function (response) {
        setClients(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch(function (error) {
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
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>List of clients</h2>

      <div>
        <button
          type="button"
          onClick={function () {
            navigate("/clients/new");
          }}
        >
          +
        </button>

        <input
          type="text"
          placeholder="Rechercher par nom"
          value={search}
          onChange={function (event) {
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
                  Name {sortDir === "asc" ? "▲" : "▼"}
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
                      onClick={function () {
                        navigate("/clients/" + client.id);
                      }}
                    >
                      View
                    </button>

                    {canEdit && (
                      <button
                        type="button"
                        onClick={function () {
                          navigate("/clients/" + client.id + "/edit");
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {canDelete && (
                      <button
                        type="button"
                        onClick={function () {
                          handleDelete(client.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div>
        <Pagination
          count={totalPages}
          page={page + 1}
          onChange={function (event, value) {
            setPage(value - 1);
          }}
        />
      </div>
    </div>
  );
}
