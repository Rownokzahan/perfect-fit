import { NextResponse, NextRequest } from "next/server";
import { getCurrentUser } from "./lib/utils/getCurrentUser";

const protectedRoutes = ["/checkout", "/my-orders", "/my-orders/:path*"];

const adminRoutes = ["/admin", "/admin/:path*"];

export async function proxy(req: NextRequest) {
  const user = await getCurrentUser();
  const { pathname } = req.nextUrl;

  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  const isAdminRoute = adminRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // Redirect to login if not authenticated and trying to access protected or admin routes
  if (!user && (isProtectedRoute || isAdminRoute)) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && user?.role !== "admin") {
    const loginUrl = new URL("/unauthorized", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply proxy only to relevant routes
export const config = {
  matcher: [
    "/checkout",
    "/my-orders",
    "/my-orders/:path*",
    "/admin",
    "/admin/:path*",
  ],
};
