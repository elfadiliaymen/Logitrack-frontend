import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../component/token";

import {
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Button,
  Menu,
  MenuItem,
  TextField,
  TablePagination,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import SortIcon from "@mui/icons-material/Sort";

const SORT_FIELDS = [
  { value: "nom,asc", label: "Nom (A-Z)" },
  { value: "nom,desc", label: "Nom (Z-A)" },
  { value: "prix,asc", label: "Prix (croissant)" },
  { value: "prix,desc", label: "Prix (décroissant)" },
  { value: "quantiteStock,asc", label: "Stock (croissant)" },
  { value: "quantiteStock,desc", label: "Stock (décroissant)" },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalElements, setTotalElements] = useState(0);
  const [sort, setSort] = useState("nom,asc");
  const [sortAnchor, setSortAnchor] = useState(null);
  const [category, setCategory] = useState("");
  const [minPrix, setMinPrix] = useState("");
  const [maxPrix, setMaxPrix] = useState("");
  const [lowStock, setLowStock] = useState(false);

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadProducts() {
    api
      .get("/products", {
        params: {
          page: page,
          size: rowsPerPage,
          sort: sort,
          categorie: category || undefined,
          minPrix: minPrix || undefined,
          maxPrix: maxPrix || undefined,
          stockFaible: lowStock || undefined,
        },
      })
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setTotalElements(response.data.length);
        } else if (response.data && response.data.content) {
          setProducts(response.data.content);
          setTotalElements(response.data.totalElements || 0);
        } else {
          setProducts([]);
          setTotalElements(0);
        }
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadProducts, [
    page,
    rowsPerPage,
    sort,
    category,
    minPrix,
    maxPrix,
    lowStock,
  ]);

  function handleDelete(productId) {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      return;
    }

    api
      .delete("/products/" + productId)
      .then(loadProducts)
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>List of products</h2>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <Tooltip title="Nouveau produit">
          <IconButton
            color="primary"
            onClick={function () {
              navigate("/products/new");
            }}
          >
            <AddBoxIcon />
          </IconButton>
        </Tooltip>

        <TextField
          label="Catégorie"
          variant="outlined"
          size="small"
          value={category}
          onChange={function (event) {
            setCategory(event.target.value);
            setPage(0);
          }}
        />

        <TextField
          label="Prix min"
          variant="outlined"
          size="small"
          type="number"
          value={minPrix}
          onChange={function (event) {
            setMinPrix(event.target.value);
            setPage(0);
          }}
        />

        <TextField
          label="Prix max"
          variant="outlined"
          size="small"
          type="number"
          value={maxPrix}
          onChange={function (event) {
            setMaxPrix(event.target.value);
            setPage(0);
          }}
        />

        <Button
          variant={lowStock ? "contained" : "outlined"}
          onClick={function () {
            setLowStock(!lowStock);
            setPage(0);
          }}
        >
          Stock faible
        </Button>

        <Button
          variant="outlined"
          startIcon={<SortIcon />}
          onClick={function (event) {
            setSortAnchor(event.currentTarget);
          }}
        >
          Trier
        </Button>

        <Menu
          anchorEl={sortAnchor}
          open={Boolean(sortAnchor)}
          onClose={function () {
            setSortAnchor(null);
          }}
        >
          {SORT_FIELDS.map(function (item) {
            return (
              <MenuItem
                key={item.value}
                onClick={function () {
                  setSort(item.value);
                  setPage(0);
                  setSortAnchor(null);
                }}
              >
                {item.label}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {products.map((product) => {
            return (
              <Card key={product.id} sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    {product.categorie}
                  </Typography>

                  <Typography variant="h5" component="div">
                    {product.nom}
                  </Typography>

                  <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                    Stock : {product.quantiteStock}
                  </Typography>

                  <Typography variant="body2">
                    Price : {product.prix}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Tooltip title="View">
                    <IconButton
                      onClick={function () {
                        navigate("/products/" + product.id);
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
                          navigate("/products/" + product.id + "/edit");
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
                          handleDelete(product.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </CardActions>
              </Card>
            );
          })}
        </Box>
      )}

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
    </div>
  );
}
