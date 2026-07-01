import { LoginFormData } from "@/src/types/auth/login-type";
import axiosInstance from "../axiosClient";
import { SignUpFormData } from "@/src/types/auth/register-type";
import { ResetPasswordFormData } from "@/src/types/auth/resetPassword-type";
import { ForgetPasswordFormData } from "@/src/types/auth/forgetPassword-type";
import { ChangePasswordFormData } from "@/src/types/auth/changePassword-type";
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


export const resetPasswordApi = async (
  payload: ResetPasswordFormData
) => {
  const body = {
    email: payload.email,
    otp: payload.otp,
    password: payload.password,
    confirm_password: payload.confirmPassword,
  };

  const { data } = await axiosInstance.post(
    "/api/auth/reset-password",
    body
  );

  return data;
};


export const forgetPasswordApi = async (
  payload: ForgetPasswordFormData
) => {
  const body = {
    email: payload.email,
  };

  const { data } = await axiosInstance.post(
    "/api/auth/forgot-password",
    body
  );

  return data;
};

export const changePasswordApi = async (
  payload: ChangePasswordFormData
) => {
  const body = {
    password: payload.password,
    password_new: payload.passwordNew,
  };

  const { data } = await axiosInstance.post(
    "/api/auth/change-password",
    body
  );

  return data;
};