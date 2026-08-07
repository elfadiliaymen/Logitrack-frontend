import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const schema = yup.object({
  nom: yup.string().required("Nom requis"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Email requis"),
  telephone: yup.string().required("Téléphone requis"),
  ville: yup.string().required("Ville requise"),
});

export default function EditClientForm() {
  const { id } = useParams();

  const navigate = useNavigate();

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
        .get("/clients/" + id)
        .then(function (response) {
          reset(response.data);
        })
        .catch(function (error) {
          console.log("Erreur :", error);
        });
    },
    [id, reset]
  );

  function onSubmit(data) {
    api
      .put("/clients/" + id, data)
      .then(function () {
        navigate("/clients");
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>Modifier le client</h2>

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
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("nom")}
          error={!!errors.nom}
          helperText={errors.nom ? errors.nom.message : ""}
        />

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        <TextField
          label="Téléphone"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("telephone")}
          error={!!errors.telephone}
          helperText={errors.telephone ? errors.telephone.message : ""}
        />

        <TextField
          label="Ville"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("ville")}
          error={!!errors.ville}
          helperText={errors.ville ? errors.ville.message : ""}
        />

        <Button type="submit" variant="contained">
          Enregistrer
        </Button>
      </Box>
    </div>
  );
}
