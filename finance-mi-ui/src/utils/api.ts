import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const request = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL ?? "http://localhost:7981",
  timeout: 15000,
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle errors before the request is sent
    return Promise.reject(error);
  }
);
