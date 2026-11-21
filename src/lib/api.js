
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAccessToken = (token) => {
  api.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : "";
};

api.interceptors.request.use((config) => {
  const token = api.defaults.headers.common.Authorization;

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export default api;
