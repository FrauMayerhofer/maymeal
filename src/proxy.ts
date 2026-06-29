import { updateSession } from "@/lib/supabase/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTES = {
  login: "/login",
  register: "/register",
  afterLogin: "/recipes",
};

const AUTH_ROUTES = [ROUTES.login, ROUTES.register];
const PROTECTED_PREFIXES = ["/recipes", "/planner", "/profile"];

export default async function proxy(request: NextRequest) {
  const { response, user } = await updateSession(request);

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);
  const isProtectedRoute = PROTECTED_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(ROUTES.afterLogin, request.url));
  }

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return response;
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
