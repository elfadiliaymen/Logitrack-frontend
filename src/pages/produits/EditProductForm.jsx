import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom</label>
          <input type="text" {...register("nom")} />

          {errors.nom && <span>{errors.nom.message}</span>}
        </div>

        <div>
          <label>Catégorie</label>
          <input type="text" {...register("categorie")} />

          {errors.categorie && (
            <span>{errors.categorie.message}</span>
          )}
        </div>

        <div>
          <label>Prix</label>
          <input type="number" step="0.01" {...register("prix")} />

          {errors.prix && <span>{errors.prix.message}</span>}
        </div>

        <div>
          <label>Quantité en stock</label>
          <input type="number" {...register("quantiteStock")} />

          {errors.quantiteStock && (
            <span>{errors.quantiteStock.message}</span>
          )}
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
