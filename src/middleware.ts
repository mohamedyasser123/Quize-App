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

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = jwtDecode<TokenPayload>(token);
    const { pathname } = request.nextUrl;

   if (
  pathname.startsWith("/instructor") &&
  user.role !== "Instructor"
) {
  return NextResponse.redirect(new URL("/login", request.url));
}

if (
  pathname.startsWith("/learner") &&
  user.role !== "Student"
) {
  return NextResponse.redirect(new URL("/login", request.url));
}

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}


export const config = {
  matcher: [
    "/instructor/:path*",
    "/learner/:path*",
    "/change-password",
  ],
};