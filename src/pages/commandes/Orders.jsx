import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../component/token";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const STATUSES = ["EN_ATTENTE", "EXPEDIEE", "LIVREE"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("");

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadOrders() {
    api
      .get("/orders")
      .then(function (response) {
        setOrders(response.data);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadOrders, []);

  function handleChangeStatus(order, statut) {
    api
      .put("/orders/" + order.id, { statut })
      .then(loadOrders)
      .catch(function (error) {
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
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  const visibleOrders =
    filter === ""
      ? orders
      : orders.filter(function (order) {
          return order.statut === filter;
        });

  return (
    <div>
      <h2>List of orders</h2>

      <Tooltip title="Nouvelle commande">
        <IconButton
          color="primary"
          onClick={function () {
            navigate("/orders/new");
          }}
        >
          <AddShoppingCartIcon />
        </IconButton>
      </Tooltip>

      <div>
        <label>Filtrer par statut : </label>

        <select
          value={filter}
          onChange={function (event) {
            setFilter(event.target.value);
          }}
        >
          <option value="">Tous</option>

          {STATUSES.map(function (statut) {
            return (
              <option key={statut} value={statut}>
                {statut}
              </option>
            );
          })}
        </select>
      </div>

      {visibleOrders.length === 0 ? (
        <p>No order found</p>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel>
                      ID
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Articles
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Date
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Status
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {visibleOrders.map(function (order) {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>

                      <TableCell>
                        {order.ligneCommandes
                          ? order.ligneCommandes.length
                          : 0}
                      </TableCell>

                      <TableCell>
                        {order.dateCommande || "-"}
                      </TableCell>

                      <TableCell>
                        <select
                          value={order.statut}
                          onChange={function (event) {
                            handleChangeStatus(
                              order,
                              event.target.value
                            );
                          }}
                        >
                          {STATUSES.map(function (statut) {
                            return (
                              <option key={statut} value={statut}>
                                {statut}
                              </option>
                            );
                          })}
                        </select>
                      </TableCell>

                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                            onClick={function () {
                              navigate("/orders/" + order.id);
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>

                        {canEdit && (
                          <Tooltip title="Edit">
                            <IconButton
                              color="warning"
                              onClick={function () {
                                navigate(
                                  "/orders/" + order.id + "/edit"
                                );
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        )}

                        {canDelete && (
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={function () {
                                handleDelete(order.id);
                              }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={visibleOrders.length}
            rowsPerPage={5}
            page={0}
            onPageChange={function () {}}
            onRowsPerPageChange={function () {}}
          />
        </Paper>
      )}
    </div>
  );
}
