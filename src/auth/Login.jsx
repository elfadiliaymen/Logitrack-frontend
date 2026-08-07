import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { saveSession } from "../component/token";

const schema = yup.object({
  username: yup.string().required("Username requis"),
  password: yup.string().required("Mot de passe requis"),
});

export default function Login() {
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
      .post("/auth/login", data)
      .then((response) => {
        saveSession(response.data.token, response.data.user);

        navigate("/dashboard");
      })
      .catch((error) => {
        console.log("Connexion échouée");
        console.log(error);
      });
  }

  return (
    <div>
      <h2>Connexion</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Nom d'utilisateur</label>
          <input type="text" {...register("username")} />

          {errors.username && (
            <span>{errors.username.message}</span>
          )}
        </div>

        <div>
          <label>Mot de passe</label>
          <input type="password" {...register("password")} />

          {errors.password && (
            <span>{errors.password.message}</span>
          )}
        </div>

        <button type="submit">
          Se connecter
        </button>
      </form>

      <p>
        Pas encore de compte ?{" "}
        <button type="button" onClick={() => navigate("/register")}>
          S'inscrire
        </button>
      </p>
    </div>
  );
}
