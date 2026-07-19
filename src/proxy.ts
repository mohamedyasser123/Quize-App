import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  sub: string;
  email: string;
  role: "Instructor" | "Student";
  iat: number;
  exp: number;
}

const permissions: Record<"Instructor" | "Student", string[]> = {
  Instructor: [
    "/dashboard",
    "/groups",
    "/quizzes",
    "/questions",
    "/students",
    "/results",
    "/change-password",
  ],
  Student: [
    "/quizzes",
    "/results",
    "/change-password",
  ],
};

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = jwtDecode<TokenPayload>(token);
    const { pathname } = request.nextUrl;

    const allowedRoutes = permissions[user.role];

    const hasAccess = allowedRoutes.some(
      (route) =>
        pathname === route || pathname.startsWith(`${route}/`)
    );

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/groups/:path*",
    "/quizzes/:path*",
    "/questions/:path*",
    "/students/:path*",
    "/results/:path*",
    "/change-password",
  ],
};
