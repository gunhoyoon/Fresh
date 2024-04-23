"use client";

import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();

  return <div>유저페이지</div>;
}
// 회사이름,직원수,복지,위치,회사 이미지(로고),회사고유 ID, 설명,
// 이 부분에서도 쿠키가 있다면, 로그인이 됐다면 -> 메인으로 리다이렉트 시켜주기.
