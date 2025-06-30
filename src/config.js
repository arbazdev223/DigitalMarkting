import axios from "axios";

export const BACKEND_URL =
  import.meta.env.VITE_APP_PROD_ENV === "production"
    ? import.meta.env.VITE_APP_BACKEND_PROD
    : import.meta.env.VITE_APP_BACKEND_DEV;

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
