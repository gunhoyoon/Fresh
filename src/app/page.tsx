"use client";
import Link from "next/link";
import Header from "./_component/header/Header";
import { useCookies } from "@/CookieContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { userType, setUserType } = useCookies();
  useEffect(() => {
    if (userType === "user") {
      router.replace("/user");
    }
    if (userType === "admin") {
      router.replace("/admin");
    }
  }, [userType]);

  return <div>비로그인 메인 페이지</div>;
}
// 이 페이지는 우리 사이트의 메인 페이지가 될거임
// 타입을 확인하기 위해서 context api를 확인할 수 밖에 없음

// 유저만 가지고 있는건 내가 좋아요를 누른 회사가 있냐 없냐
// 비로그인 / 어드민은 좋아요 누른건 없고 그냥 추천회사와 같은 리스트가 나올거임
//
