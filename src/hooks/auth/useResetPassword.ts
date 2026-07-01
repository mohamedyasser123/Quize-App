"use client";

import { resetPasswordApi } from "@/src/services/auth";
import { ResetPasswordFormData } from "@/src/types/auth/resetPassword-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function useResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

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

    const response = await resetPasswordApi(data);

    toast.success(response.message);

    setIsSuccess(true);

    setTimeout(() => {
      router.push("/login");
    }, 1500);

  } catch (error) {
    console.error(error);
    toast.error("Something went wrong");
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