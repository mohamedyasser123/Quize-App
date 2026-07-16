"use client";

import { Check, Loader2, Lock } from "lucide-react";

import AuthInput from "@/src/components/shared/Auth-UI/AuthInput/AuthInput";
import useChangePassword from "@/src/hooks/auth/useChangePassword";

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  } = useChangePassword();

  const passwordNew = watch("passwordNew");

  return (
    <>
      <h2 className="text-4xl mb-20 font-bold text-[#C5D86D]">
        Change password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <AuthInput
          label="Old Password"
          icon={Lock}
          isPassword
          placeholder="Type your old password"
          error={errors.password?.message}
          disabled={isLoading}
          {...register("password", {
            required: "Old password is required",
          })}
        />

        <AuthInput
          label="New Password"
          icon={Lock}
          isPassword
          placeholder="Type your new password"
          error={errors.passwordNew?.message}
          disabled={isLoading}
          {...register("passwordNew", {
            required: "New password is required",
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
          placeholder="Confirm your new password"
          error={errors.confirmPassword?.message}
          disabled={isLoading}
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordNew || "Passwords do not match",
          })}
        />

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="self-start px-10 py-3 bg-white text-[#0D1321] font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Changing...
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              Changed
            </>
          ) : (
            "Change"
          )}
        </button>
      </form>
    </>
  );
}