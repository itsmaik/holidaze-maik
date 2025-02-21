import axios from "axios";
import { useAuth } from "@hooks/useAuth";
import { base_api_url } from "./config";
import { api_key } from "./config";

const axiosInstance = axios.create({
  baseURL: base_api_url,
});

axiosInstance.defaults.headers.common["X-Noroff-API-Key"] = api_key;

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuth().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
