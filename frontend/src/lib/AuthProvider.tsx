import { useCallback, useState, useEffect } from "react";
import type { User } from "./types";
import { AuthContext } from "./AuthContext";
import apiClient from "./apiClient";
import { handleAxiosError } from "./utils";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await apiClient.get("/api/profile");
        setUser({ email: response.data.email });
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      await apiClient.post("/api/auth/login", { email, password });
      setUser({ email });
    } catch (error) {
      console.error(error);
      setError(handleAxiosError(error));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true);
    setError("");
    try {
      await apiClient.post("/api/auth/register", { email, password });
      setUser({ email });
    } catch (error) {
      console.error(error);
      setError(handleAxiosError(error));
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      await apiClient.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error(error);
      setError(handleAxiosError(error));
    } finally {
      setLoading(false);
    }
  }, []);

  const resetError = useCallback(async () => {
    setError("");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user, loading, error, resetError }}>
      {children}
    </AuthContext.Provider>
  );
};
