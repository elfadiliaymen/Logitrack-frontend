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

export default function EditProductForm() {
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
        .get("/products/" + id)
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
      .put("/products/" + id, data)
      .then(function () {
        navigate("/products");
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div>
      <h2>Modifier le produit</h2>

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
          label="Catégorie"
          variant="outlined"
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
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
          slotProps={{ inputLabel: { shrink: true } }}
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
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("quantiteStock")}
          error={!!errors.quantiteStock}
          helperText={
            errors.quantiteStock ? errors.quantiteStock.message : ""
          }
        />

        <Button type="submit" variant="contained">
          Enregistrer
        </Button>
      </Box>
    </div>
  );
}
