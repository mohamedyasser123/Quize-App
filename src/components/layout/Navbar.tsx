"use client";

import { useAuth } from "@/src/context/AuthContext/AuthContext";

export default function Navbar() {
      const { user } = useAuth();

  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <h1 className="text-xl font-bold">QuizWiz</h1>

     <div>
  {user?.role === "Instructor"
    ? "Instructor Menu"
    : "Student Menu"}
</div>
    </header>
  );
}