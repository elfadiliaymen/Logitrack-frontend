import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { saveSession } from "../component/token";
import "./auth.css";

const schema = yup.object({
  username: yup.string().required("Username requis"),

  nom: yup.string().required("Nom requis"),

  prenom: yup.string().required("Prénom requis"),

  email: yup
    .string()
    .email("Email invalide")
    .required("Email requis"),

  password: yup
    .string()
    .min(6, "Minimum 6 caractères")
    .required("Mot de passe requis"),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe doivent correspondre"
    )
    .required("Confirmation requise"),

  role: yup.string().required("Rôle requis"),
});

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    const registerRequest = {
      username: data.username,
      password: data.password,
      role: data.role,
      nom: data.nom,
      prenom: data.prenom,
      email: data.email,
    };

    api
      .post("/auth/register", registerRequest)
      .then(function (response) {
        console.log("Inscription réussie");
        saveSession(response.data.token);
        navigate("/dashboard");
      })
      .catch(function (error) {
        console.log("Inscription échouée");
        console.log(error);
      });
  }

  return (
    <div className="auth-page register-page">
      <h2>Inscription</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input type="text" {...register("username")} />

          {errors.username && (
            <span>{errors.username.message}</span>
          )}
        </div>

        <div>
          <label>Nom</label>
          <input type="text" {...register("nom")} />

          {errors.nom && (
            <span>{errors.nom.message}</span>
          )}
        </div>

        <div>
          <label>Prénom</label>
          <input type="text" {...register("prenom")} />

          {errors.prenom && (
            <span>{errors.prenom.message}</span>
          )}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />

          {errors.email && (
            <span>{errors.email.message}</span>
          )}
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} />

          {errors.password && (
            <span>{errors.password.message}</span>
          )}
        </div>

        <div>
          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            {...register("confirmPassword")}
          />

          {errors.confirmPassword && (
            <span>{errors.confirmPassword.message}</span>
          )}
        </div>

        <div>
          <label>Rôle</label>

          <select {...register("role")}>
            <option value="">Choisir un rôle</option>
            <option value="MANAGER">MANAGER</option>
            <option value="AGENT">AGENT</option>
          </select>

          {errors.role && (
            <span>{errors.role.message}</span>
          )}
        </div>

        <button type="submit">
          S'inscrire
        </button>
      </form>

      <p className="auth-switch">
        Vous avez déjà un compte ?{" "}
        <button type="button" onClick={() => navigate("/login")}>
          Se connecter
        </button>
      </p>
    </div>
  );
}
