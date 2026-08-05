import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { getRole } from "../../component/token";

export default function Products() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const role = getRole();

  const canEdit = role === "ADMIN" || role === "MANAGER";

  const canDelete = role === "ADMIN";

  function loadProducts() {
    api
      .get("/products")
      .then(function (response) {
        setProducts(response.data);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  useEffect(loadProducts, []);

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

      <button
        onClick={function () {
          navigate("/products/new");
        }}
      >
        Nouveau produit
      </button>

      {products.length === 0 ? (
        <p>No product found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nom}</td>
                  <td>{product.categorie}</td>
                  <td>{product.prix}</td>
                  <td>{product.quantiteStock}</td>
                  <td>
                    <button
                      onClick={function () {
                        navigate("/products/" + product.id);
                      }}
                    >
                      View
                    </button>

                    {canEdit && (
                      <button
                        onClick={function () {
                          navigate("/products/" + product.id + "/edit");
                        }}
                      >
                        Edit
                      </button>
                    )}

                    {canDelete && (
                      <button
                        onClick={function () {
                          handleDelete(product.id);
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
