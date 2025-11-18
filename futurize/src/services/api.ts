import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  timeout: 30000, // 30 segundos
  headers: {
    "Content-Type": "application/json",
  },
});
