import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const STATUSES = ["EN_ATTENTE", "EXPEDIEE", "LIVREE"];

export default function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [statut, setStatut] = useState("");

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
    },
    [id]
  );

  function handleChangeStatus() {
    api
      .put("/orders/" + id, { statut })
      .then(function (response) {
        setOrder(response.data);
        setStatut(response.data.statut);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  if (order === null) {
    return <p>Loading...</p>;
  }

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
        <strong>Status:</strong> {order.statut}
      </p>

      <h3>Articles</h3>

      {order.ligneCommandes && order.ligneCommandes.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produit</th>
              <th>Quantité</th>
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
                  <td>{ligne.quantite}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucun article</p>
      )}

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

        <button onClick={handleChangeStatus}>Enregistrer</button>
      </div>

      <button
        onClick={function () {
          navigate("/orders");
        }}
      >
        Back
      </button>
    </div>
  );
}
