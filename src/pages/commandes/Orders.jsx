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
import "./commandes.css";

const STATUSES = [
  "NOUVELLE",
  "EN_PREPARATION",
  "EN_ATTENTE",
  "EXPEDIEE",
  "LIVREE",
];

 function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("dateCommande");
  const [sortDir, setSortDir] = useState("asc");
  const [filter, setFilter] = useState("");
  const [clientNom, setClientNom] = useState("");

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadOrders() {
    api
      .get("/orders", {
        params: {
          page: page,
          size: 10,
          sort: sortBy + "," + sortDir,
          statut: filter || undefined,
          clientNom: clientNom || undefined,
        },
      })
      .then((response) => {
        setOrders(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadOrders, [page, sortBy, sortDir, filter, clientNom]);

  function handleSort(field) {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
    setPage(0);
  }

  function handleChangeStatus(order, statut) {
    api
      .put("/orders/" + order.id + "/status", statut)
      .then(loadOrders)
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  function handleDelete(orderId) {
    if (!window.confirm("Voulez-vous vraiment supprimer cette commande ?")) {
      return;
    }

    api
      .delete("/orders/" + orderId)
      .then(loadOrders)
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  function sortArrow(field) {
    if (sortBy !== field) return null;

    return sortDir === "asc" ? (
      <ArrowUpwardIcon fontSize="small" />
    ) : (
      <ArrowDownwardIcon fontSize="small" />
    );
  }

  return (
    <div className="orders-page">
      <h2>List of orders</h2>

      <div className="toolbar">
        <button
          type="button"
          aria-label="Créer une commande"
          onClick={() => {
            navigate("/orders/new");
          }}
        >
          <AddIcon />
        </button>

        <label>Rechercher par client : </label>

        <input
          type="text"
          placeholder="Nom du client"
          value={clientNom}
          onChange={(event) => {
            setClientNom(event.target.value);
            setPage(0);
          }}
        />

        <label>Filtrer par statut : </label>

        <select
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
            setPage(0);
          }}
        >
          <option value="">Tous</option>

          {STATUSES.map((statut) => {
            return (
              <option key={statut} value={statut}>
                {statut}
              </option>
            );
          })}
        </select>
      </div>

      {orders.length === 0 ? (
        <p>No order found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>

              <th>Client</th>

              <th>Articles</th>

              <th>
                <button
                  type="button"
                  onClick={() => {
                    handleSort("dateCommande");
                  }}
                >
                  Date {sortArrow("dateCommande")}
                </button>
              </th>

              <th>
                <button
                  type="button"
                  onClick={() =>  {
                    handleSort("statut");
                  }}
                >
                  Status {sortArrow("statut")}
                </button>
              </th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>{order.client ? order.client.nom : "-"}</td>

                  <td>
                    {order.ligneCommandes
                      ? order.ligneCommandes.length
                      : 0}
                  </td>

                  <td>{order.dateCommande || "-"}</td>

                  <td>
                    <select
                      value={order.statut}
                      onChange={(event) => {
                        handleChangeStatus(order, event.target.value);
                      }}
                    >
                      {STATUSES.map((statut) => {
                        return (
                          <option key={statut} value={statut}>
                            {statut}
                          </option>
                        );
                      })}
                    </select>
                  </td>

                  <td>
                    <button
                      type="button"
                      aria-label="Voir la commande"
                      onClick={() => {
                        navigate("/orders/" + order.id);
                      }}
                    >
                      <VisibilityIcon />
                    </button>

                    {canEdit && (
                      <button
                        type="button"
                        aria-label="Modifier la commande"
                        onClick={() => {
                          navigate("/orders/" + order.id + "/edit");
                        }}
                      >
                        <EditIcon />
                      </button>
                    )}

                    {canDelete && (
                      <button
                        type="button"
                        aria-label="Supprimer la commande"
                        onClick={() => {
                          handleDelete(order.id);
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

export default Orders;
