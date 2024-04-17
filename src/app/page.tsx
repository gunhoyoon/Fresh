"use client";
import Link from "next/link";
import Header from "./_component/header/Header";
import { useCookies } from "@/CookieContext";

export default function Home() {
  const { userType, setUserType } = useCookies();

  return (
    <div>
      {userType === "" ? (
        <div>비로그인</div>
      ) : userType === "user" ? (
        <div>유저 로그인</div>
      ) : (
        <div>어드민 로그인</div>
      )}
    </div>
  );
}
// 처음 페이지에 접근을 하면 로그인이 됐는지를 확인해서 안됐으면 로그인을 하는 페이지로 보내주는게 맞음
