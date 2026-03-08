import { useState, useEffect } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "./AuthContextInstance";
import jwt_decode from "jwt-decode"; // npm i jwt-decode

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(token ? { logged: true } : null);

  async function login(credentials) {
    const data = await loginUser(credentials);
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser({ logged: true });
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  }

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwt_decode(token); 
      const now = Date.now() / 1000; 

      if (decoded.exp < now) {
        setTimeout(() => {
          logout();
        }, 0);
      } else {
        const timeout = (decoded.exp - now) * 1000;
        const timer = setTimeout(logout, timeout);
        return () => clearTimeout(timer);
      }
    } catch {
      setTimeout(() => {
        logout();
      }, 0);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}