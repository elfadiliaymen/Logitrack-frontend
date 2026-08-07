import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";

const STATUSES = [
  "NOUVELLE",
  "EN_PREPARATION",
  "EN_ATTENTE",
  "EXPEDIEE",
  "LIVREE",
];

export default function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [statut, setStatut] = useState("");
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantite, setQuantite] = useState(1);

  useEffect(
    function () {
      api
        .get("/orders/" + id)
        .then(function (response) {
          setOrder(response.data);
          setStatut(response.data.statut);
        })
        .catch(function (error) {
          console.log("Erreur :", error);
        });

      api
        .get("/products")
        .then(function (response) {
          setProducts(
            Array.isArray(response.data)
              ? response.data
              : (response.data && response.data.content) || []
          );
        })
        .catch(function (error) {
          console.log("Erreur :", error);
        });
    },
    [id]
  );

  function handleChangeStatus() {
    api
      .put("/orders/" + id + "/status", statut)
      .then(function (response) {
        setOrder(response.data);
        setStatut(response.data.statut);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  function handleAddProduct() {
    if (!productId) {
      return;
    }

    api
      .post("/orders/" + id + "/products", {
        produit: { id: productId },
        quantite: quantite,
      })
      .then(function () {
        return api.get("/orders/" + id);
      })
      .then(function (response) {
        setOrder(response.data);
        setProductId("");
        setQuantite(1);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  if (order === null) {
    return <p>Loading...</p>;
  }

  const total =
    order.ligneCommandes && order.ligneCommandes.length > 0
      ? order.ligneCommandes.reduce(function (sum, ligne) {
          return sum + (ligne.produit ? ligne.produit.prix : 0) * ligne.quantite;
        }, 0)
      : 0;

  return (
    <div>
      <h2>Order details</h2>

      <p>
        <strong>ID:</strong> {order.id}
      </p>

      <p>
        <strong>Date:</strong> {order.dateCommande || "-"}
      </p>

      <p>
        <strong>Client:</strong> {order.client ? order.client.nom : "-"}
      </p>

      <p>
        <strong>Status:</strong> {order.statut}
      </p>

      <h3>Articles</h3>

      {order.ligneCommandes && order.ligneCommandes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix unitaire</th>
              <th>Quantité</th>
              <th>Sous-total</th>
            </tr>
          </thead>

          <tbody>
            {order.ligneCommandes.map(function (ligne) {
              return (
                <tr key={ligne.id}>
                  <td>{ligne.id}</td>
                  <td>
                    {ligne.produit ? ligne.produit.nom : "-"}
                  </td>
                  <td>
                    {ligne.produit ? ligne.produit.categorie : "-"}
                  </td>
                  <td>
                    {ligne.produit ? ligne.produit.prix : "-"}
                  </td>
                  <td>{ligne.quantite}</td>
                  <td>
                    {ligne.produit
                      ? (ligne.produit.prix * ligne.quantite).toFixed(2)
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucun article</p>
      )}

      <p>
        <strong>Total:</strong> {total.toFixed(2)}
      </p>

      <Box
        component="div"
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 2,
          mb: 2,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          select
          label="Produit"
          variant="outlined"
          size="small"
          sx={{ minWidth: 220 }}
          value={productId}
          onChange={function (event) {
            setProductId(event.target.value);
          }}
        >
          <MenuItem value="">Choisir un produit</MenuItem>

          {products.map(function (product) {
            return (
              <MenuItem key={product.id} value={product.id}>
                {product.nom}
              </MenuItem>
            );
          })}
        </TextField>

        <TextField
          label="Quantité"
          type="number"
          variant="outlined"
          size="small"
          inputProps={{ min: 1 }}
          value={quantite}
          onChange={function (event) {
            setQuantite(Number(event.target.value));
          }}
        />

        <Button variant="contained" onClick={handleAddProduct}>
          Ajouter au produit
        </Button>
      </Box>

      <div>
        <label>Changer le statut : </label>

        <select
          value={statut}
          onChange={function (event) {
            setStatut(event.target.value);
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

        <Button variant="contained" onClick={handleChangeStatus}>
          Enregistrer
        </Button>
      </div>

      <Button
        variant="outlined"
        onClick={function () {
          navigate("/orders");
        }}
      >
        Back
      </Button>
    </div>
  );
}
