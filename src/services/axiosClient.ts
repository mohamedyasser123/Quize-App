import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL:"https://upskilling-egypt.com:3005",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Something went wrong";

    switch (status) {
      case 400:
        toast.error(message);
        break;

      case 401:
        if (typeof window !== "undefined" && localStorage.getItem("token")) {
          toast.error("Session expired, please login again.");

          localStorage.removeItem("token");

          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        } else {
          toast.error(message);
        }
        break;

      case 403:
        toast.error(message);
        break;

      case 404:
        toast.error(message);
        break;

      case 500:
        toast.error("Internal Server Error");
        break;

      default:
        toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;