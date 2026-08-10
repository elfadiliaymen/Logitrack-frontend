import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./orders.css";

const STATUSES = [
  "EN_ATTENTE",
  "EXPEDIEE",
  "LIVREE",
];

const schema = yup.object({
  statut: yup.string().required("Statut requis"),
});

function EditOrderForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(
    function () {
      api
        .get("/clients")
        .then(function (response) {
          setClients(
            Array.isArray(response.data)
              ? response.data
              : (response.data && response.data.content) || []
          );
        })
        .catch((error) => {
          console.log("Erreur :", error);
        });

      api
        .get("/orders/" + id)
        .then((response) => {
          reset({ statut: response.data.statut });

          if (response.data.client && response.data.client.id) {
            setClientId(String(response.data.client.id));
          }
        })
        .catch((error) => {
          console.log("Erreur :", error);
        });
    },
    [id, reset]
  );

  function onSubmit(data) {
    const request = clientId
      ? { ...data, client: { id: clientId } }
      : data;

    api
      .put("/orders/" + id, request)
      .then(() => {
        navigate("/orders");
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="edit-order-form-page">
      <h2>Modifier la commande</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Client</label>

          <select
            value={clientId}
            onChange={(event) => {
              setClientId(event.target.value);
            }}
          >
            <option value="">Conserver le client actuel</option>

            {clients.map((client) => {
              return (
                <option key={client.id} value={client.id}>
                  {client.nom}
                </option>
              );
            })}
          </select>
        </div>

        <div>
          <label>Statut</label>

          <select {...register("statut")}>
            {STATUSES.map((statut) => {
              return (
                <option key={statut} value={statut}>
                  {statut}
                </option>
              );
            })}
          </select>

          {errors.statut && <span>{errors.statut.message}</span>}
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}

export default EditOrderForm;