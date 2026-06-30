import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  email: string;
  role: "Instructor" | "Student";
  iat: number;
  exp: number;
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = jwtDecode<TokenPayload>(token);

  if (
    pathname.startsWith("/dashboard") &&
    user.role !== "Instructor"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (
    pathname.startsWith("/quiz") &&
    user.role !== "Student"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/quiz/:path*"],
};