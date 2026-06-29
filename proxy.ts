import getUser from "@/features/auth/actions/getUser";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ROUTES = {
  login: "/login",
  register: "/register",
  afterLogin: "/",
};
const PROTECTED_ROUTES: string[] = [ROUTES.afterLogin];
const AUTH_ROUTES: string[] = [ROUTES.login, ROUTES.register];

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });

  let user = null;
  try {
    user = await getUser();
  } catch {
    // no valid session — treat as unauthenticated
  }

  const pathname = request.nextUrl.pathname;
  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL(ROUTES.afterLogin, request.url));
  }

  if (!isAuthRoute && !user) {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }

  return response;
}

export const config = {
  matcher:
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
