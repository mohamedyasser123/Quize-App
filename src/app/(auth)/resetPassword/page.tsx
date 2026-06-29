"use client";

import AuthInput from "@/src/components/shared/Auth-UI/AuthInput/AuthInput";
import useResetPassword from "@/src/hooks/auth/useResetPassword";
import { Check, Globe, Loader2, Lock, Mail } from "lucide-react";

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  } = useResetPassword();

  const passwordValue = watch("password");

  return (
    <>
      <h2 className="text-4xl mb-20 font-bold text-[#C5D86D]">
        Reset password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full">
        <AuthInput
          label="Email Address"
          icon={Mail}
          type="email"
          placeholder="Type your email"
          error={errors.email?.message}
          disabled={isLoading}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />

        <AuthInput
          label="OTP"
          icon={Globe}
          placeholder="Type your OTP"
          error={errors.otp?.message}
          disabled={isLoading}
          {...register("otp", {
            required: "OTP is required",
            minLength: {
              value: 4,
              message: "OTP must be at least 4 characters",
            },
          })}
        />

        <AuthInput
          label="Password"
          icon={Lock}
          isPassword
          placeholder="Type your Password"
          error={errors.password?.message}
          disabled={isLoading}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />

        <AuthInput
          label="Confirm Password"
          icon={Lock}
          isPassword
          placeholder="Type your confirm Password"
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="px-10 py-3 bg-white text-[#0D1321] font-bold rounded-2xl hover:bg-gray-200 transition-colors shadow-lg disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Reset
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              Done
            </>
          ) : (
            "Reset"
          )}
        </button>
      </form>
    </>
  );
}
