import axios from "axios";
import { clearSession } from "../component/token";

const api = axios.create({
  baseURL: "http://localhost:8087/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }

    return config;
  },

  function (error) {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    const status = error.response.status;

    if (status === 401) {
      clearSession();
      window.location.replace("/register");
    }

    if (status === 403) {
      console.log("403 Forbidden");
    }

    if (status === 404) {
      console.log("404 Not Found");
    }

    if (status === 500) {
      console.log("500 Internal Server Error");
    }

    return Promise.reject(error);
  }
);

export default api;

