import { create } from "zustand";
import { components } from "../utils/types";

interface AuthState {
  user: components["schemas"]["GetCurrenUserDto"] | null;
  setUser: (user: AuthState["user"]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
