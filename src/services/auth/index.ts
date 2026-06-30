import { LoginFormData } from "@/src/types/auth/login-type";
import axiosInstance from "../axiosClient";

export const loginApi = async (payload: LoginFormData) => {
  const { data } = await axiosInstance.post("/api/auth/login", payload);

  return data;
};