"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { logoutApi } from "@/src/services/auth";
import toast from "react-hot-toast";
interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: "Instructor" | "Student";
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
  const storedToken = Cookies.get("accessToken");
  const storedUser = Cookies.get("user");

  if (storedToken) {
    setToken(storedToken);
  }

  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

const login = (token: string, user: User) => {
  Cookies.set("accessToken", token);
  Cookies.set("user", JSON.stringify(user));

  setToken(token);
  setUser(user);
};
const logout = async () => {
  try {
   const response = await logoutApi();
    toast.success(response.message);

  } catch (error) {
    console.error(error);
  } finally {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("user");

    setToken(null);
    setUser(null);
  }
};

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}