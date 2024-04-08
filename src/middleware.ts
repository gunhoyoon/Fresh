import { auth } from "./auth";
import { NextResponse } from "next/server";

export async function middleware() {
  const session = await auth();
  if (!session) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
}

export const config = {
  matcher: ["/company/:path*"],
};
// 로그인이 필요한 부분 : 회사 상세 페이지,
// 해당 미들웨어는 nextJS에서 지원하는 기능
