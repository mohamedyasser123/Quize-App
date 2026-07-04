"use client";

import { useAuth } from "@/src/context/AuthContext/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import  { useState, useRef, useEffect } from "react";
import { 
  Bell, 
  Mail, 
  PlusCircle, 
  ChevronDown, 
  KeyRound, 
  LogOut,
   
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth(); 
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
const router = useRouter();
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";
    
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 border-b border-gray-200 bg-white px-4 sm:px-8 flex items-center justify-between select-none relative z-40 w-full">
      
      <div className="flex items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center h-full">
        
        {user?.role === "Instructor" && (
          <div className="hidden sm:flex items-center pr-6 h-full border-r border-gray-200">
            <button className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-black font-semibold px-4 py-2 rounded-full text-sm transition-all shadow-sm active:scale-95">
              <PlusCircle className="w-4 h-4" />
              <span>New quiz</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-center px-4 sm:px-6 h-full border-r border-gray-200 relative cursor-pointer group">
          <div className="relative p-1">
            <Mail className="w-6 h-6 text-black stroke-[2]" />
            <span className="absolute -top-1 -right-2 bg-orange-100 text-[#e07a5f] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm">
              10
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center px-4 sm:px-6 h-full border-r border-gray-200 relative cursor-pointer group">
          <div className="relative p-1">
            <Bell className="w-6 h-6 text-black stroke-[2]" />
            <span className="absolute -top-1 -right-2 bg-orange-100 text-[#e07a5f] text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white shadow-sm">
              10
            </span>
          </div>
        </div>

        <div className="relative h-full flex items-center pl-4 sm:pl-6" ref={dropdownRef}>
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="flex flex-col text-left">
              <span className="font-semibold text-sm sm:text-base text-gray-900 leading-tight">
                {user?.first_name && user?.last_name ? `${user.first_name} ${user.last_name}` : "Nwabuiikwu Chizuruoke"}
              </span>
              <span className="text-xs font-medium text-[#a4df44] mt-0.5">
                {user?.email}
              </span>
              <span className="text-xs font-medium text-[#a4df44] mt-0.5">
                {user?.role || "Tutor"}
              </span>
            </div>
            
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-250 ${isOpen ? "rotate-185" : ""}`} />
          </div>

          {isOpen && (
            <div className="absolute right-0 top-[calc(100%-10px)] w-56 bg-white border border-gray-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-150">
              
              <button 
                 onClick={() => {
    setIsOpen(false);
    router.push("/changepassword");
  }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors font-medium text-left"
              >
                <KeyRound className="w-4 h-4 text-gray-500" />
                <span>Change Password</span>
              </button>

              <div className="h-px bg-gray-100 my-1" />

              <button 
                 onClick={async () => {
    setIsOpen(false);

    await logout();

    router.replace("/login");
  }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium text-left"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Log Out</span>
              </button>

            </div>
          )}
        </div>

      </div>
    </header>
  );
}