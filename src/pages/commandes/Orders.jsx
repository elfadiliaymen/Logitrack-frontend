import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../component/token";
import ActionMenu from "../../component/ActionMenu";

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
  Button,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const STATUSES = [
  "NOUVELLE",
  "EN_PREPARATION",
  "EN_ATTENTE",
  "EXPEDIEE",
  "LIVREE",
];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [filter, setFilter] = useState("");
  const [filterAnchor, setFilterAnchor] = useState(null);

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadOrders() {
    api
      .get("/orders", {
        params: {
          page: page,
          size: rowsPerPage,
          sort: sortBy + "," + sortDir,
          statut: filter || undefined,
        },
      })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setOrders(response.data);
          setTotalElements(response.data.length);
        } else if (response.data && response.data.content) {
          setOrders(response.data.content);
          setTotalElements(response.data.totalElements || 0);
        } else {
          setOrders([]);
          setTotalElements(0);
        }
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadOrders, [page, rowsPerPage, sortBy, sortDir, filter]);

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

  return (
    <div>
      <h2>List of orders</h2>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
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

        <span>Filtrer par statut : </span>

        <Button
          variant="outlined"
          onClick={function (event) {
            setFilterAnchor(event.currentTarget);
          }}
        >
          {filter === "" ? "Tous" : filter}
        </Button>

        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={function () {
            setFilterAnchor(null);
          }}
        >
          <MenuItem
            onClick={function () {
              setFilter("");
              setPage(0);
              setFilterAnchor(null);
            }}
          >
            Tous
          </MenuItem>

          {STATUSES.map(function (statut) {
            return (
              <MenuItem
                key={statut}
                onClick={function () {
                  setFilter(statut);
                  setPage(0);
                  setFilterAnchor(null);
                }}
              >
                {statut}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      {orders.length === 0 ? (
        <p>No order found</p>
      ) : (
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "id"}
                      direction={sortBy === "id" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("id");
                      }}
                    >
                      ID
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    Client
                  </TableCell>

                  <TableCell>
                    Articles
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "dateCommande"}
                      direction={
                        sortBy === "dateCommande" ? sortDir : "asc"
                      }
                      onClick={function () {
                        handleSort("dateCommande");
                      }}
                    >
                      Date
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "statut"}
                      direction={sortBy === "statut" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("statut");
                      }}
                    >
                      Status
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.map(function (order) {
                  return (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>

                      <TableCell>
                        {order.client ? order.client.nom : "-"}
                      </TableCell>

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
                        <ActionMenu
                          options={[
                            {
                              label: "View",
                              onClick: function () {
                                navigate("/orders/" + order.id);
                              },
                            },
                            ...(canEdit
                              ? [
                                  {
                                    label: "Edit",
                                    onClick: function () {
                                      navigate(
                                        "/orders/" + order.id + "/edit"
                                      );
                                    },
                                  },
                                ]
                              : []),
                            ...(canDelete
                              ? [
                                  {
                                    label: "Delete",
                                    onClick: function () {
                                      handleDelete(order.id);
                                    },
                                  },
                                ]
                              : []),
                          ]}
                        />
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
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={function (event, newPage) {
              setPage(newPage);
            }}
            onRowsPerPageChange={function (event) {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Paper>
      )}
    </div>
  );
}
