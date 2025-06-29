const BACKEND_URL =
  import.meta.env.VITE_APP_PROD_ENV === "production"
    ? import.meta.env.VITE_APP_BACKEND_PROD
    : import.meta.env.VITE_APP_BACKEND_DEV;

const FRONTEND_URL =
  import.meta.env.VITE_APP_PROD_ENV === "production"
    ? import.meta.env.VITE_APP_FRONTEND_PROD
    : import.meta.env.VITE_APP_FRONTEND_DEV;

export const url = BACKEND_URL;
export const frontendUrl = FRONTEND_URL;
