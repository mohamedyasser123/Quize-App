"use client";

import Link from "next/link";
import { Check, Loader2, Mail } from "lucide-react";

import AuthInput from "@/src/components/shared/Auth-UI/AuthInput/AuthInput";
import useForgetPassword from "@/src/hooks/auth/useForgetPassword";

export default function ForgetPasswordForm() {
  const {
    register,
    handleSubmit,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  } = useForgetPassword();

  return (
    <>
      <h2 className="text-4xl mb-20 font-bold text-[#C5D86D]">
        Forgot password
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
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

        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="self-start px-10 py-3 bg-white text-[#0D1321] font-bold rounded-lg hover:bg-gray-200 transition-colors shadow-lg disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : isSuccess ? (
            <>
              <Check className="w-5 h-5 text-green-600" />
              Sent
            </>
          ) : (
            "Send Email"
          )}
        </button>

        <div className="self-end text-sm mt-6">
          Login?{" "}
          <Link
            href="/login"
            className="text-[#C5D86D] font-semibold hover:underline"
          >
            Click here
          </Link>
        </div>
      </form>
    </>
  );
}
