import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create()(
  persist(
    (set) => ({
      user: null,
      logout: () => set({ user: null }),
      updateUser: (user) => set({ user }),
    }),
    {
      name: "ph-admin-auth-storage",
    }
  )
);

export default useAuthStore;
