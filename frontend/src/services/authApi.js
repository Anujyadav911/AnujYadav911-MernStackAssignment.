import api from "./apiClient";

export const loginRequest = async ({ email, password }) => {
  const res = await api.post("/auth/login", { email, password });
  return res.data;
};

export const registerRequest = async ({ name, email, password }) => {
  const res = await api.post("/auth/register", { name, email, password });
  return res.data;
};







