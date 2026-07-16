"use client";

import { AuthProvider } from "../context/AuthContext/AuthContext";


export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}