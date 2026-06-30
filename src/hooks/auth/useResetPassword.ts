"use client";

import { resetPasswordApi } from "@/src/services/auth";
import { ResetPasswordFormData } from "@/src/types/auth/resetPassword-type";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

const onSubmit = async (data: ResetPasswordFormData) => {
  try {
    setIsSuccess(false);
    setIsLoading(true);

    await resetPasswordApi(data);

    setIsSuccess(true);
  } catch (error) {
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

  return {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  };
}