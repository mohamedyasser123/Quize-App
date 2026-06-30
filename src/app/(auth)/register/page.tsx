"use client";

import AuthInput from '@/src/components/shared/Auth-UI/AuthInput/AuthInput';
import useSignUp from '@/src/hooks/auth/useRegister';
import { ArrowDown, BriefcaseBusiness, CheckCircle2, Contact2, Lock, Mail, User, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function RegisterForm() {
    const pathname = usePathname();
  
const isSignIn = pathname === "/login";
const isSignUp = pathname === "/register";
  
  const { register, handleSubmit, errors, isLoading, onSubmit } = useSignUp();
 return (
  <div className="w-full max-w-xl flex flex-col gap-8 px-4 sm:px-0">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#a3df44] text-center sm:text-left">
      Create your account and start using QuizWiz!
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

<Link
  href="/register" 
  className={`flex flex-col items-center justify-center gap-2 p-4 sm:p-6 rounded-2xl border-2 transition-all duration-200
    ${isSignUp ? "border-[#a3df44] bg-[#22252a]" : "border-transparent bg-[#2c2e33] hover:bg-[#32353b]"}`}
>
  <UserPlus className={`w-8 h-8 sm:w-10 sm:h-10 ${isSignUp ? "text-[#a3df44]" : "text-white"}`} />
  <span className="font-semibold text-white text-sm sm:text-base">Sign Up</span>
</Link>
      </div>

    {/* Form */}
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      
      {/* First Name & Last Name Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AuthInput
          label="Your first name"
          icon={Contact2} 
          type="text"
          placeholder="Type your first name"
          disabled={isLoading}
          error={errors.firstName?.message}
          {...register("firstName", { required: "First name is required" })}
        />

        <AuthInput
          label="Your last name"
          icon={Contact2}
          type="text"
          placeholder="Type your last name"
          disabled={isLoading}
          error={errors.lastName?.message}
          {...register("lastName", { required: "Last name is required" })}
        />
      </div>

      {/* Email Input */}
      <AuthInput
        label="Your email address"
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

      <div className="w-full flex flex-col gap-2 relative">
        <label className="text-sm font-medium text-slate-200">Your role</label>
        <div className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none">
            <BriefcaseBusiness  className="w-5 h-5" /> 
          </div>
          <select
            disabled={isLoading}
            {...register("role", { required: "Role is required" })}
            className={`w-full bg-[#0a0f1d] border-2 rounded-xl py-3 pl-12 pr-10 text-slate-200 appearance-none focus:outline-none transition-all cursor-pointer
              ${errors.role ? "border-red-500" : "border-slate-700 focus:border-[#a3df44]"}`}
          >
            <option value="" disabled className="text-slate-500">Choose your role</option>
           <><option value="Student">Student</option>
<option value="Instructor">Instructor</option></> 
          </select>
          <div className="absolute right-4 text-slate-400 pointer-events-none">
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
        {errors.role && <span className="text-xs text-red-500">{errors.role.message}</span>}
      </div>

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

      <div className="mt-2 w-full flex justify-start">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#f4f5f7] hover:bg-white text-black font-bold py-3 px-8 rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50"
        >
          <span>Sign Up</span>
          <CheckCircle2 className="w-5 h-5 fill-black text-[#f4f5f7]" />
        </button>
      </div>
    </form>
  </div>
);
}
