import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Vite proxy handles forwarding to Express backend
  withCredentials: true, // Required if backend uses cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
