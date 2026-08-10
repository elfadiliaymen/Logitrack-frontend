import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import api from "../../api/api";
import "./products.css";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(
    function () {
      api
        .get("/products/" + id)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log("Erreur :", error);
        });
    },
    [id]
  );

  if (product === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details-page">
      <h2>Product details</h2>

      <div className="details-info">
        <p>
          <strong>ID:</strong> {product.id}
        </p>

        <p>
          <strong>Name:</strong> {product.nom}
        </p>

        <p>
          <strong>Category:</strong> {product.categorie}
        </p>

        <p>
          <strong>Price:</strong> {product.prix}
        </p>

        <p>
          <strong>Stock:</strong> {product.quantiteStock}
        </p>
      </div>

      <button
        type="button"
        aria-label="Modifier le produit"
        onClick={() => {
          navigate("/products/" + id + "/edit");
        }}
      >
        <EditIcon />
      </button>

      <button
        type="button"
        aria-label="Retour à la liste des produits"
        onClick={() => {
          navigate("/products");
        }}
      >
        <ArrowBackIcon />
      </button>
    </div>
  );
}

export default ProductDetails;
