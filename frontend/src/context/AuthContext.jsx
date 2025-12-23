import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest } from "../services/authApi";

const AuthContext = createContext(null);

const STORAGE_KEY = "todo_auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }
  }, []);

  useEffect(() => {
    if (user && token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user, token]);

  const login = async (credentials) => {
    const data = await loginRequest(credentials);
    setUser(data.user);
    setToken(data.token);
  };

  const register = async (details) => {
    // Only create user; login will be done separately
    await registerRequest(details);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


