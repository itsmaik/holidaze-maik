import axios from "axios";
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
      config.headers.Authorization = `Bearer: ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
