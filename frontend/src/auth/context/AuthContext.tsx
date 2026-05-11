import React, { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./authContext";
import type {
  AuthUser,
  LoginFormData,
  RegisterFormData,
} from "../types/auth.types";

const API_URL = "http://localhost:3001/api";
const TOKEN_KEY = "wc_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      // TODO: GET /api/auth/me
    }
  }, []);

  const login = useCallback(async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Login failed");
      }
      const { token, user } = await res.json();
      localStorage.setItem(TOKEN_KEY, token);
      setUser({ id: user.id, fullName: user.displayName, email: user.email });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          displayName: data.fullName,
          phone: data.phone,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Register failed");
      }
      const { token, user } = await res.json();
      localStorage.setItem(TOKEN_KEY, token);
      setUser({ id: user.id, fullName: user.displayName, email: user.email });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
