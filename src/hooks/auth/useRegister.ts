"use client";

import { registerApi } from "@/src/services/auth";
import { SignUpFormData } from "@/src/types/auth/register-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
  try {
    setIsLoading(true);

    const response = await registerApi(data);

    toast.success(response.message);

    setIsSuccess(true);
  } catch (error) {
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