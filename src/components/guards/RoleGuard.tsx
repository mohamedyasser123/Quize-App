"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/context/AuthContext/AuthContext";

type Role = "Instructor" | "Student";

interface RoleGuardProps {
  allowedRole: Role;
  children: React.ReactNode;
}

export default function RoleGuard({
  allowedRole,
  children,
}: RoleGuardProps) {
  const router = useRouter();

  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (user && user.role !== allowedRole) {
      router.replace("/login");
    }
  }, [isAuthenticated, user, allowedRole, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  if (user.role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
}