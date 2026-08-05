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
import PersonAddIcon from "@mui/icons-material/PersonAdd";

export default function Clients() {
  const [clients, setClients] = useState([]);

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadClients() {
    api
      .get("/clients")
      .then(function (response) {
        setClients(response.data);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadClients, []);

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

      {clients.length === 0 ? (
        <p>No client found</p>
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
                      Name
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

                      <TableCell>
                        <Tooltip title="View">
                          <IconButton
                            onClick={function () {
                              navigate("/clients/" + client.id);
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
                                  "/clients/" + client.id + "/edit"
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
                                handleDelete(client.id);
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
            count={clients.length}
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
