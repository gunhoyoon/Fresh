import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionId = request.cookies.get("connect.sid")?.toString() as string;
  const token = request.cookies.get("connect.sid");
  console.log(token?.value);

  const isOnUserRoute = pathname.startsWith("/user");
  console.log("isOnUserRoute", isOnUserRoute);
  const isOnAdminRoute = pathname.startsWith("/admin");

  if (!sessionId) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  if (token?.value === "user-cookie") {
    if (isOnUserRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/user", request.url));
  } else {
    if (isOnAdminRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
