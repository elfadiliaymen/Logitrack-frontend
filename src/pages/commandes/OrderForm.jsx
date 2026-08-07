import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const schema = yup.object({
  clientId: yup.string().required("Client requis"),
  statut: yup.string().required("Statut requis"),
});

export default function OrderForm() {
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      statut: "EN_ATTENTE",
    },
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
        .catch(function (error) {
          console.log("Erreur :", error);
        });
    },
    []
  );

  function onSubmit(data) {
    api
      .post("/orders", data)
      .then(function (response) {
        navigate("/orders/" + response.data.id);
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>Nouvelle commande</h2>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 1,
          p: 3,
          maxWidth: 480,
        }}
      >
        <div>
          <label>Client</label>

          <select {...register("clientId")}>
            <option value="">Choisir un client</option>

            {clients.map(function (client) {
              return (
                <option key={client.id} value={client.id}>
                  {client.nom}
                </option>
              );
            })}
          </select>

          {errors.clientId && <span>{errors.clientId.message}</span>}
        </div>

        <div>
          <label>Statut</label>

          <select {...register("statut")}>
            <option value="EN_ATTENTE">EN_ATTENTE</option>
            <option value="EXPEDIEE">EXPEDIEE</option>
            <option value="LIVREE">LIVREE</option>
          </select>

          {errors.statut && <span>{errors.statut.message}</span>}
        </div>

        <Button type="submit" variant="contained">
          Créer
        </Button>
      </Box>
    </div>
  );
}
