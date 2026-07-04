import Navbar from "@/src/components/layout/Navbar";
import { Sidebar } from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="min-h-screen bg-slate-100">
        <Navbar />

        <div className="flex">
          <Sidebar />

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
  );
}
