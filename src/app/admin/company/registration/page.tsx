"use client";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

export default function RegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const add = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch(`/api/admin/addCompany`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
    },
    onSuccess: () => {},
    onError: () => {},
  });
  const onAdd = () => {
    const formData = new FormData();
    formData.append("companyName", companyName); //문자열
    // formData.append("employeeCount", employeeCount); //숫자
    // formData.append("benefits", benefits); // 배열, 스트링으로 전부 변환해서 줘야함 JSON으로
    // formData.append("location", location); //문자열
    // formData.append("logoUrl", logoUrl); //문자열. 이미지는 파일 첨부해서 또 압축하고 그래야겠네 base64 인코딩
    // formData.append("description", description); //문자열
    // formData.append("like", like); //숫자

    // 아이디는 서버에서 추가할거임
    add.mutate();
  };
  return <div>회사 등록페이지</div>;
}

// 등록 페이지 자체는 비로그인 / 유저는 접근 못함. 애초에 접근하지도 못하겠지만, 진짜 만에 하나 주소를 때려맞춰서 들어온다면? 내보내야됨
// 그러니까 어떻게 들어온다고 한들 cookie가 admin이 아니라면 나가야됨. 뭐 또는 관리자 전용 페이지라는 다른 텍스트를 보여주거나

// 이 부분에선 회사가 가지고 있는 데이터가 전부 들어가야함. 그래서 post를 여기서 쏘면 됨
// 이 컴포넌트의 역할은 단지 회사를 추가하는 컴포넌트임
