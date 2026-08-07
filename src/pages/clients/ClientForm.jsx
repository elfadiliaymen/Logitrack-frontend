import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
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

export default function ClientForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    api
      .post("/clients", data)
      .then(function () {
        navigate("/clients");
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>Nouveau client</h2>

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
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email ? errors.email.message : ""}
        />

        <TextField
          label="Téléphone"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("telephone")}
          error={!!errors.telephone}
          helperText={errors.telephone ? errors.telephone.message : ""}
        />

        <TextField
          label="Ville"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("ville")}
          error={!!errors.ville}
          helperText={errors.ville ? errors.ville.message : ""}
        />

        <Button type="submit" variant="contained">
          Créer
        </Button>
      </Box>
    </div>
  );
}
