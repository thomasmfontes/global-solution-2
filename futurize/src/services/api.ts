import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://futurize-api-production.up.railway.app/api",
  timeout: 30000, // 30 segundos
  headers: {
    "Content-Type": "application/json",
  },
});
