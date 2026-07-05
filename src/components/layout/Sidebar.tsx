"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  LayoutDashboard, 
  FileText, 
  Users, 
  GraduationCap, 
  HelpCircle, 

} from "lucide-react";
import logo from "../../assests/Logo icon.png"
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext/AuthContext";
export default function Sidebar() {
        const { user } = useAuth();
  
  const pathname = usePathname();
const instructorItems = [
    { name: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
        { name: "Groups", href: "/instructor/groups", icon: FileText }, 
    { name: "Quizzes", href: "/instructor/quizzes", icon: FileText }, 
    { name: "Questions", href: "/instructor/questions", icon: FileText }, 

    { name: "Students", href: "/instructor/students", icon: Users },
    { name: "Results", href: "/instructor/results", icon: GraduationCap },
  ];

  const studentItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Quizzes", href: "/student/quizzes", icon: FileText }, 
    { name: "Results", href: "/student/results", icon: GraduationCap },
  ];
  const menuItems = user?.role === "Instructor" ? instructorItems : studentItems;
return (
  <aside className="fixed bottom-0 left-0 right-0 h-20 md:relative md:h-full w-full md:w-64 bg-white border-t md:border-t-0 md:border-r border-gray-200 flex flex-row md:flex-col justify-between text-black select-none z-50 px-2 md:px-0">
    
    <div className="flex flex-row md:flex-col items-center md:items-stretch w-full justify-around md:justify-start">
      
      <div className="hidden md:flex items-center gap-4 px-6 py-5 border-b border-gray-200">
        <Menu className="w-6 h-6 text-gray-700 cursor-pointer hover:text-black transition-colors" />
        <div className="h-8 flex items-center"> 
          <Image 
            src={logo} 
            alt="QuizWiz Logo"
            className="h-8 w-auto object-contain" 
            priority
          />
        </div>
      </div>

      <nav className="flex flex-row md:flex-col w-full justify-around md:justify-start">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group relative flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 md:px-6 py-2 md:py-6 md:border-b border-gray-200 font-semibold text-xs md:text-lg transition-all
                ${isActive ? "bg-white text-black" : "text-gray-700 hover:bg-gray-50 hover:text-black"}`}
            >
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] md:h-auto md:top-0 md:bottom-0 md:right-0 md:left-auto md:w-[5px] bg-[#0B1220]" />
              )}

              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm
                ${isActive ? "bg-[#0B1220] text-white" : "bg-orange-50 text-[#e07a5f]"}`}
              >
                <item.icon className="w-4 h-4 md:w-6 md:h-6 stroke-[2]" />
              </div>

              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>

    <div className="flex items-center md:border-t border-gray-200">
      <Link
        href="/instructor/help"
        className="group flex flex-col md:flex-row items-center gap-1 md:gap-4 px-3 md:px-6 py-2 md:py-6 font-semibold text-xs md:text-lg text-gray-700 hover:bg-gray-50 hover:text-black transition-all"
      >
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-orange-50 text-[#e07a5f] flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm">
          <HelpCircle className="w-4 h-4 md:w-6 md:h-6 stroke-[2]" />
        </div>
        <span>Help</span>
      </Link>
    </div>

  </aside>
);
}