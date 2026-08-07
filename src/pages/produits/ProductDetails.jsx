import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "@mui/material/Button";

export default function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  useEffect(
    function () {
      api
        .get("/products/" + id)
        .then(function (response) {
          setProduct(response.data);
        })
        .catch(function (error) {
          console.log("Erreur :", error);
        });
    },
    [id]
  );

  if (product === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Product details</h2>

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

      <Button
        variant="outlined"
        color="warning"
        onClick={function () {
          navigate("/products/" + id + "/edit");
        }}
      >
        Edit
      </Button>

      <Button
        variant="outlined"
        onClick={function () {
          navigate("/products");
        }}
      >
        Back
      </Button>
    </div>
  );
}
