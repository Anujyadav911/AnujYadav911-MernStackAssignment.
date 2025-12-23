import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000"
});

api.interceptors.request.use((config) => {
  const stored = window.localStorage.getItem("todo_auth");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;






