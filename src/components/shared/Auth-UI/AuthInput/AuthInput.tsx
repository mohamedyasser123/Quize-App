"use client";

import { Eye, EyeOff, LucideIcon } from "lucide-react";
import React, { useState, forwardRef } from "react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: LucideIcon;
  error?: string;
  isPassword?: boolean; 
}

export default forwardRef<HTMLInputElement, AuthInputProps>(function AuthInput(
  { label, icon: Icon, error, isPassword = false, type = "text", ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2 w-full text-white">
      {/* Label */}
      <label className="text-sm font-medium text-gray-300">{label}</label>
      
      <div className="relative flex items-center">
        <Icon className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
        
        {/* Input */}
        <input
          ref={ref}
          type={inputType}
          className={`w-full pl-12 py-3 rounded-2xl bg-transparent border text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors
            ${isPassword ? "pr-12" : "pr-4"} 
            ${error ? "border-red-500 focus:border-red-500" : "border-white"}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-gray-400 hover:text-white transition-colors focus:outline-none"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <span className="text-xs text-red-400 mt-0.5 pl-1">
          {error}
        </span>
      )}
    </div>
  );
});