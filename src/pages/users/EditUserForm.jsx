import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./users.css";

const ROLES = ["ADMIN", "MANAGER", "AGENT"];

const schema = yup.object({
  username: yup.string().required("Username requis"),
  nom: yup.string().required("Nom requis"),
  prenom: yup.string().required("Prénom requis"),
  email: yup
    .string()
    .email("Email invalide")
    .required("Email requis"),
  password: yup.string().min(6, "Minimum 6 caractères"),
  role: yup.string().required("Rôle requis"),
});

export default function EditUserForm() {
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
        .get("/users/" + id)
        .then(function (response) {
          const user = response.data;

          reset({
            username: user.username,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email,
            role: user.role,
          });
        })
        .catch(function (error) {
          console.log("Erreur :", error);
        });
    },
    [id, reset]
  );

  function onSubmit(data) {
    const request = { ...data };

    if (!request.password) {
      delete request.password;
    }

    api
      .put("/users/" + id, request)
      .then(function () {
        navigate("/users");
      })
      .catch(function (error) {
        console.log("Erreur :", error);
      });
  }

  return (
    <div className="edit-user-form-page">
      <h2>Modifier l'utilisateur</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input type="text" {...register("username")} />

          {errors.username && <span>{errors.username.message}</span>}
        </div>

        <div>
          <label>Nom</label>
          <input type="text" {...register("nom")} />

          {errors.nom && <span>{errors.nom.message}</span>}
        </div>

        <div>
          <label>Prénom</label>
          <input type="text" {...register("prenom")} />

          {errors.prenom && <span>{errors.prenom.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />

          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Nouveau mot de passe (optionnel)</label>
          <input type="password" {...register("password")} />

          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <label>Rôle</label>

          <select {...register("role")}>
            <option value="">Choisir un rôle</option>

            {ROLES.map((role) => {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              );
            })}
          </select>

          {errors.role && <span>{errors.role.message}</span>}
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
}
