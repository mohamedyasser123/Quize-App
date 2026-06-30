import { LoginFormData } from "@/src/types/auth/login-type";
import axiosInstance from "../axiosClient";
import { SignUpFormData } from "@/src/types/auth/register-type";

export const loginApi = async (payload: LoginFormData) => {
  const { data } = await axiosInstance.post("/api/auth/login", payload);

  return data;
}


export const registerApi = async (payload: SignUpFormData) => {
  const body = {
    first_name: payload.firstName,
    last_name: payload.lastName,
    email: payload.email,
    password: payload.password,
    role: payload.role,
  };

  const { data } = await axiosInstance.post("/api/auth/register", body);

  return data;
};