import axios from "axios";

export const BACKEND_URL =
  import.meta.env.VITE_APP_PROD_ENV === "production"
    ? (import.meta.env.VITE_APP_BACKEND_PROD?.replace(/\/+$/, "") + "/api")
    : import.meta.env.VITE_APP_BACKEND_DEV || "http://localhost:5000/api";
console.log("BACKEND_URL:", BACKEND_URL);

console.log(("BACKEND_URL2:" (import.meta.env.VITE_APP_BACKEND_PROD?.replace(/\/+$/, "") + "/api")))
export const FRONTEND_URL =
  import.meta.env.VITE_APP_PROD_ENV === "production"
    ? import.meta.env.VITE_APP_FRONTEND_PROD
    : import.meta.env.VITE_APP_FRONTEND_DEV;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosAuthInstance = (token) =>
  axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
