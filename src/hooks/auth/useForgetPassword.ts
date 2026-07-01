"use client";

import { forgetPasswordApi } from "@/src/services/auth";
import { ForgetPasswordFormData } from "@/src/types/auth/forgetPassword-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useForgetPassword() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetPasswordFormData) => {
    try {
      setIsSuccess(false);
      setIsLoading(true);

     const response =  await forgetPasswordApi(data);
     toast.success(response.message)

      setIsSuccess(true);

      router.push("/resetPassword");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  };
}