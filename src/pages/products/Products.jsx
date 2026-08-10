import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../../api/api";
import { getRole } from "../../component/token";
import Pagination from "@mui/material/Pagination";
import "./products.css";

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
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("nom,asc");
  const [category, setCategory] = useState("");
  const [prix, setPrix] = useState("");
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
          size: 10,
          sort: sort,
          categorie: category || undefined,
          prix: prix || undefined,
          stockFaible: lowStock || undefined,
        },
      })
      .then((response) => {
        setProducts(response.data.content || []);
        setTotalPages(response.data.totalPages || 1);
      })
      .catch((error) =>  {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadProducts, [page, sort, category, prix, lowStock]);

  function handleDelete(productId) {
    if (!window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      return;
    }

    api
      .delete("/products/" + productId)
      .then(loadProducts)
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="products-page">
      <h2>List of products</h2>

      <div className="toolbar">
        <button
          type="button"
          aria-label="Créer un produit"
          onClick={() => {
            navigate("/products/new");
          }}
        >
          <AddIcon />
        </button>

        <label>Catégorie</label>
        <input
          type="text"
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setPage(0);
          }}
        />

        <label>Prix</label>
        <input
          type="number"
          value={prix}
          onChange={(event) => {
            setPrix(event.target.value);
            setPage(0);
          }}
        />

        <button
          type="button"
          onClick={() => {
            setLowStock(!lowStock);
            setPage(0);
          }}
        >
          Stock faible
        </button>

        <label>Trier</label>

        <select
          value={sort}
          onChange={(event) => {
            setSort(event.target.value);
            setPage(0);
          }}
        >
          {SORT_FIELDS.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>

      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.id}>

                <h3>{product.nom}</h3>

                <p>Stock : {product.quantiteStock}</p>

                <p>Price : {product.prix}</p>

                <div className="product-actions">
                  <button
                    type="button"
                    aria-label="Voir le produit"
                    onClick={() =>  {
                      navigate("/products/" + product.id);
                    }}
                  >
                    <VisibilityIcon />
                  </button>

                  {canEdit && (
                    <button
                      type="button"
                      aria-label="Modifier le produit"
                      onClick={() => {
                        navigate("/products/" + product.id + "/edit");
                      }}
                    >
                      <EditIcon />
                    </button>
                  )}

                  {canDelete && (
                    <button
                      type="button"
                      aria-label="Supprimer le produit"
                      onClick={() =>  {
                        handleDelete(product.id);
                      }}
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
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
