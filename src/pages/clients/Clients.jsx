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
  TextField,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [sortBy, setSortBy] = useState("nom");
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
          size: rowsPerPage,
          sort: sortBy + "," + sortDir,
          nom: search || undefined,
        },
      })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setClients(response.data);
          setTotalElements(response.data.length);
        } else if (response.data && response.data.content) {
          setClients(response.data.content);
          setTotalElements(response.data.totalElements || 0);
        } else {
          setClients([]);
          setTotalElements(0);
        }
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadClients, [page, rowsPerPage, sortBy, sortDir, search]);

  function handleSort(field) {
    if (sortBy === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDir("asc");
    }
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

      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <Tooltip title="Nouveau client">
          <IconButton
            color="primary"
            onClick={function () {
              navigate("/clients/new");
            }}
          >
            <PersonAddIcon />
          </IconButton>
        </Tooltip>

        <TextField
          label="Rechercher par nom"
          variant="outlined"
          size="small"
          value={search}
          onChange={function (event) {
            setSearch(event.target.value);
            setPage(0);
          }}
          slotProps={{
            input: {
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            },
          }}
        />
      </Box>

      {clients.length === 0 ? (
        <p>No client found</p>
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
                    <TableSortLabel
                      active={sortBy === "nom"}
                      direction={sortBy === "nom" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("nom");
                      }}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "email"}
                      direction={sortBy === "email" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("email");
                      }}
                    >
                      Email
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "telephone"}
                      direction={sortBy === "telephone" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("telephone");
                      }}
                    >
                      Phone
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel
                      active={sortBy === "ville"}
                      direction={sortBy === "ville" ? sortDir : "asc"}
                      onClick={function () {
                        handleSort("ville");
                      }}
                    >
                      City
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {clients.map((client) => {
                  return (
                    <TableRow key={client.id}>
                      <TableCell>{client.id}</TableCell>

                      <TableCell>{client.nom}</TableCell>

                      <TableCell>{client.email}</TableCell>

                      <TableCell>{client.telephone}</TableCell>

                      <TableCell>{client.ville}</TableCell>

                      <TableCell>
                        <ActionMenu
                          options={[
                            {
                              label: "View",
                              onClick: function () {
                                navigate("/clients/" + client.id);
                              },
                            },
                            ...(canEdit
                              ? [
                                  {
                                    label: "Edit",
                                    onClick: function () {
                                      navigate(
                                        "/clients/" + client.id + "/edit"
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
                                      handleDelete(client.id);
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
