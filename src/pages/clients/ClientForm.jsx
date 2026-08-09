import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./clients.css";

const schema = yup.object({
  nom: yup.string().required("Nom requis"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Email requis"),
  telephone: yup.string().required("Téléphone requis"),
  ville: yup.string().required("Ville requise"),
});

 function ClientForm() {
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
      .then(() => {
        navigate("/clients");
      })
      .catch((error) => {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="client-form-page">
      <h2>Nouveau client</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom</label>
          <input type="text" {...register("nom")} />

          {errors.nom && <span>{errors.nom.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Téléphone</label>
          <input type="text" {...register("telephone")} />

          {errors.telephone && (
            <span>{errors.telephone.message}</span>
          )}
        </div>

        <div>
          <label>Ville</label>
          <input type="text" {...register("ville")} />

          {errors.ville && <span>{errors.ville.message}</span>}
        </div>

        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default ClientForm;