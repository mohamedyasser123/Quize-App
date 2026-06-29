"use client";

import AuthInput from '@/src/components/shared/Auth-UI/AuthInput/AuthInput';
import useLogin from '@/src/hooks/auth/useLogin';
import { CheckCircle2, Lock, Mail, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function LoginForm() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
    const pathname = usePathname();

 const {
    register,
    handleSubmit,
    watch,
    errors,
    isLoading,
    isSuccess,
    onSubmit,
  } = useLogin();
  
const isSignIn = pathname === "/login";
const isSignUp = pathname === "/register";
return (
  <div className="w-full max-w-xl flex flex-col gap-8 px-4 sm:px-0">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#a3df44] text-center sm:text-left">
      Continue your learning journey with QuizWiz!
    </h1>

    <div className="grid grid-cols-2 gap-4">
     <Link
  href="/login" 
  className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200
    ${isSignIn ? "border-[#a3df44] bg-[#22252a]" : "border-transparent bg-[#2c2e33] hover:bg-[#32353b]"}`}
>
  <User className={`w-8 h-8 sm:w-10 sm:h-10 ${isSignIn ? "text-[#a3df44]" : "text-white"}`} />
  <span className="font-semibold text-white text-sm sm:text-base">Sign in</span>
</Link>

{/* تابس الـ Sign Up */}
<Link
  href="/register" 
  className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200
    ${isSignUp ? "border-[#a3df44] bg-[#22252a]" : "border-transparent bg-[#2c2e33] hover:bg-[#32353b]"}`}
>
  <UserPlus className={`w-8 h-8 sm:w-10 sm:h-10 ${isSignUp ? "text-[#a3df44]" : "text-white"}`} />
  <span className="font-semibold text-white text-sm sm:text-base">Sign Up</span>
</Link>
    </div>

    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <AuthInput
        label="Registered email address"
        icon={Mail}
        type="email"
        placeholder="Type your email"
        disabled={isLoading}
        error={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        })}
      />

      <AuthInput
        label="Password"
        icon={Lock}
        type="password"
        placeholder="Type your password"
        disabled={isLoading}
        error={errors.password?.message}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters",
          },
        })}
      />

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-2 w-full">
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f4f5f7] hover:bg-white text-black font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span>{activeTab === "signin" ? "Sign In" : "Sign Up"}</span>
          <CheckCircle2 className="w-5 h-5 fill-black text-[#f4f5f7]" />
        </button>

        <div className="text-sm text-slate-400 flex items-center justify-center sm:justify-start gap-1 flex-wrap text-center">
          <span className="whitespace-nowrap">Forgot password?</span>
          <a
            onClick={(e) => {
              e.preventDefault();
              console.log("Forgot password clicked");
            }}
            className="flex items-center gap-1 text-[#a3df44] hover:underline font-medium cursor-pointer whitespace-nowrap"
          >
            <span>click here</span>
          </a>
        </div>
      </div>
    </form>
  </div>
);
}
