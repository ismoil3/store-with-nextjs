import { api } from "@/config/config";
import axios from "axios";
import { create } from "zustand";

export const useAuth = create((set, get) => ({
  error: "",
  loading: false,
  setError: (error) => set(() => ({ error: error })),
  setLoading: (loading) => set(() => ({ loading: loading })),

  logIn: async (objUser) => {
    const { setError, setLoading } = get();
    setLoading(true);
    try {
      const { data } = await axios.post(`${api}/Account/login`, objUser);
      localStorage.setItem("access_token", data.data);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      if (error.status == 400) {
        setError("Invalid UserName or Password");
      }
    } finally {
      setLoading(false);
    }
  },

  registration: async (newUser) => {
    const { setError, setLoading } = get();
    setLoading(true);
    try {
      await axios.post(`${api}/Account/register`, newUser);
      window.location.href = "/login";
    } catch (error) {
      console.log(error);
      if (error.status == 500) {
        setError("User Name already exists");
      }
    } finally {
      setLoading(false);
    }
  },
}));
