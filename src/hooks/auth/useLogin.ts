"use client";

import { useAuth } from "@/src/context/AuthContext/AuthContext";
import { loginApi } from "@/src/services/auth";
import { LoginFormData } from "@/src/types/auth/login-type";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

const onSubmit = async (data: LoginFormData) => {
  try {
    setIsLoading(true);

   const response = await loginApi(data);

Cookies.set("accessToken", response.data.accessToken, {
  expires: 7,
});

Cookies.set("refreshToken", response.data.refreshToken, {
  expires: 30,
});

toast.success(response.message);

login(
  response.data.accessToken,
  response.data.profile
);

const role = response.data.profile.role;
console.log(response.data.profile);
console.log(response.data.profile.role);
if (role === "Instructor") {
  router.replace("/instructor/dashboard");
} else {
  router.replace("/learner/dashboard");
}



    setIsSuccess(true);
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