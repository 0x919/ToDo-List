import { createContext } from "react";
import type { User } from "./types";

interface ProviderProps {
  user: User | null;
  login(username: string, password: string): void;
  register(username: string, password: string): void;
  logout(): void;
  isAuthenticated: boolean;
  loading: boolean;
  error: string;
  resetError(): void;
}

export const AuthContext = createContext<ProviderProps>({
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
  loading: false,
  error: "",
  resetError: () => {},
});
