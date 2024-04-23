"use client";
import { usePathname } from "next/navigation";
import React from "react";

export default function CompanyDetail() {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  // id가지고 요청해서 데이터 받아옴
  // 이 페이지에선 그럼 들어오면 useQuery로 데이터 요청하는거임
  return (
    <div>
      {/* DetailPage 페이지,일단 목록에서 회사를 클릭해서 상세로 가면 디테일 나오고,
      수정누르면, 입력할 수 있게 바뀌는 + 삭제도 가능 일단 수정 삭제 버튼은
      여기서만 할 수 있게 */}
      <p>Current pathname: {id}</p>
    </div>
  );
}
// 상세는 누구나 접근이 가능
// 여기서 수정도 가능(물론 어드민만)
