import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const authStore = create((set) => ({
  user: null,
  isRegistering: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isChecking: true,

  register: async (credentials) => {
    set({ isRegistering: true });
    try {
      const res = await axios.post("/api/v1/auth/register", credentials);
      set({ user: res.data.user });
      toast.success("Successfully registered !");
    } catch (error) {
      toast.error(error.response.data.message || "Register failed !");
    } finally {
      set({ isRegistering: false });
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });

    try {
      const res = await axios.post("/api/v1/auth/login", credentials);
      set({ user: res.data.user });
      toast.success("Successfully logged in !");
    } catch (error) {
      toast.error(error.response.data.message || "Login failed !");
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });

    try {
      const res = await axios.post("/api/v1/auth/logout");
      set({
        user: null,
      });
      toast.success("Successfully logout !");
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed !");
    } finally {
      set({ isLoggingOut: false });
    }
  },

  authCheck: async () => {
    set({ isChecking: true });
    try {
      const res = await axios.get("/api/v1/auth/check");
      set({
        user: res.data.user,
        isChecking: false,
      });
    } catch (error) {
      set({
        isChecking: false,
        user: null,
      });
    }
  },
}));
