import axios from "axios";
import { base_api_url, api_key } from "./config";

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
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized. You may be logged out.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
