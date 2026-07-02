"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KeyRound } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-[#0B1120] text-white p-5">
      <nav className="space-y-2">
        <Link
          href="/changepassword"
          className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
            pathname === "/change-password"
              ? "bg-[#a3df44] text-black"
              : "hover:bg-slate-800"
          }`}
        >
          <KeyRound className="w-5 h-5" />
          <span>Change Password</span>
        </Link>
      </nav>
    </aside>
  );
}