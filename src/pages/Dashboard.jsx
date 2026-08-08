import React, { useEffect, useState } from "react";
import { getRole, getUser } from "../component/token";
import api from "../api/api";
import "./pages.css";

export default function Dashboard() {
  const user = getUser();
  const role = getRole();

  const isAdminManager = role === "ADMIN" || role === "MANAGER";

  const [nbClients, setNbClients] = useState(0);
  const [nbProduits, setNbProduits] = useState(0);
  const [nbCommandes, setNbCommandes] = useState(0);
  const [nbEnAttente, setNbEnAttente] = useState(0);
  const [nbExpediees, setNbExpediees] = useState(0);
  const [nbLivrees, setNbLivrees] = useState(0);

  const [stockFaible, setStockFaible] = useState([]);
  const [meilleurProduit, setMeilleurProduit] = useState(null);
  const [commandesRecentes, setCommandesRecentes] = useState([]);

  function getList(data) {
    if (Array.isArray(data)) {
      return data;
    }

    if (data && data.content) {
      return data.content;
    }

    return [];
  }

  useEffect(
    function () {
      if (isAdminManager) {
        api.get("/dashboard/clients/count").then(function (res) {
          setNbClients(res.data);
        });
        api.get("/dashboard/products/count").then(function (res) {
          setNbProduits(res.data);
        });
        api.get("/dashboard/orders/count").then(function (res) {
          setNbCommandes(res.data);
        });
        api.get("/dashboard/orders/count/NOUVELLE").then(function (res) {
          setNbEnAttente(res.data);
        });
        api.get("/dashboard/orders/count/EXPEDIEE").then(function (res) {
          setNbExpediees(res.data);
        });
        api.get("/dashboard/orders/count/LIVREE").then(function (res) {
          setNbLivrees(res.data);
        });
      }

      api.get("/dashboard/products/low-stock").then(function (res) {
        setStockFaible(getList(res.data));
      });
      api.get("/dashboard/products/top-product").then(function (res) {
        setMeilleurProduit(res.data);
      });
      api.get("/dashboard/orders/recent").then(function (res) {
        setCommandesRecentes(getList(res.data));
      });
    },
    [isAdminManager]
  );

  return (
    <div className="page-dashboard">
      <h2>Tableau de bord</h2>

      {user && (
        <p>
          Bienvenue, {user.prenom} {user.nom} ({role})
        </p>
      )}

      {isAdminManager && (
        <div className="dashboard-section">
          <h3>Statistiques</h3>

          <div className="dashboard-stats">
            <p>Nombre de clients : {nbClients}</p>
            <p>Nombre de produits : {nbProduits}</p>
            <p>Nombre de commandes : {nbCommandes}</p>
            <p>Commandes en attente : {nbEnAttente}</p>
            <p>Commandes expédiées : {nbExpediees}</p>
            <p>Commandes livrées : {nbLivrees}</p>
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <h3>Produit le plus commandé</h3>

        {meilleurProduit && meilleurProduit.id ? (
          <p>
            {meilleurProduit.nom} — {meilleurProduit.categorie} —
            Stock : {meilleurProduit.quantiteStock} — Prix :{" "}
            {meilleurProduit.prix}
          </p>
        ) : (
          <p>Aucun produit commandé</p>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Produits avec un stock faible</h3>

        {stockFaible.length === 0 ? (
          <p>Aucun produit en stock faible</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Stock</th>
                <th>Prix</th>
              </tr>
            </thead>

            <tbody>
              {stockFaible.map(function (produit) {
                return (
                  <tr key={produit.id}>
                    <td>{produit.id}</td>
                    <td>{produit.nom}</td>
                    <td>{produit.categorie}</td>
                    <td>{produit.quantiteStock}</td>
                    <td>{produit.prix}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="dashboard-section">
        <h3>Commandes récentes</h3>

        {commandesRecentes.length === 0 ? (
          <p>Aucune commande</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>

            <tbody>
              {commandesRecentes.map(function (commande) {
                return (
                  <tr key={commande.id}>
                    <td>{commande.id}</td>
                    <td>
                      {commande.client ? commande.client.nom : "-"}
                    </td>
                    <td>{commande.dateCommande || "-"}</td>
                    <td>{commande.statut}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
