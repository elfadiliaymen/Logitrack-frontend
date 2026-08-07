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
  categorie: yup.string().required("Catégorie requise"),
  prix: yup
    .number()
    .typeError("Prix invalide")
    .min(0, "Le prix doit être positif")
    .required("Prix requis"),
  quantiteStock: yup
    .number()
    .typeError("Quantité invalide")
    .integer("Quantité entière requise")
    .min(0, "La quantité doit être positive")
    .required("Quantité requise"),
});

export default function ProductForm() {
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
      .post("/products", data)
      .then(function () {
        navigate("/products");
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>Nouveau produit</h2>

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
          label="Catégorie"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("categorie")}
          error={!!errors.categorie}
          helperText={errors.categorie ? errors.categorie.message : ""}
        />

        <TextField
          label="Prix"
          type="number"
          slotProps={{ htmlInput: { step: "0.01" } }}
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("prix")}
          error={!!errors.prix}
          helperText={errors.prix ? errors.prix.message : ""}
        />

        <TextField
          label="Quantité en stock"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          {...register("quantiteStock")}
          error={!!errors.quantiteStock}
          helperText={
            errors.quantiteStock ? errors.quantiteStock.message : ""
          }
        />

        <Button type="submit" variant="contained">
          Créer
        </Button>
      </Box>
    </div>
  );
}
