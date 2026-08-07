import React, { useEffect, useState } from "react";
import api from "../api/api";

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
} from "@mui/material";

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
                      Username
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Nom
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Email
                    </TableSortLabel>
                  </TableCell>

                  <TableCell>
                    <TableSortLabel>
                      Rôle
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map(function (user) {
                  return (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>

                      <TableCell>{user.username}</TableCell>

                      <TableCell>
                        {user.prenom} {user.nom}
                      </TableCell>

                      <TableCell>{user.email}</TableCell>

                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
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
