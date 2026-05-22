import { create } from "zustand";

interface AuthState {

  token: string | null;

  role: string | null;

  setToken: (
    token: string,
    role?: string
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({

    token:
      localStorage.getItem("token"),

    role:
      localStorage.getItem("role"),

    setToken: (token, role = "USER") => {

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "role",
        role
      );

      set({ token, role });
    },

    logout: () => {

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "role"
      );

      set({ token: null, role: null });
    },
  }));