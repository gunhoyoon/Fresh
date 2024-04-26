"use client";
import { useMutation } from "@tanstack/react-query";
import React, { ChangeEventHandler, useRef, useState } from "react";

export default function RegistrationPage() {
  const [companyName, setCompanyName] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [benefits, setBenefits] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [benefitValue, setBenefitValue] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);

  const imgRef = useRef<HTMLInputElement>(null);
  const add = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch(`/api/admin/addCompany`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    },
    onSuccess: () => {},
    onError: () => {},
  });
  const onAdd = () => {
    const formData = new FormData();
    formData.append("companyName", companyName); //문자열
    formData.append("employeeCount", employeeCount); //숫자
    formData.append("benefits", JSON.stringify(benefits)); // 배열, 스트링으로 전부 변환해서 줘야함 JSON으로
    formData.append("location", location || ""); //문자열
    // formData.append("logoUrl", logoUrl); //문자열. 이미지는 파일 첨부해서 또 압축하고 그래야겠네 base64 인코딩
    formData.append("description", description); //문자열
    // formData.append("like", like); //숫자
    add.mutate(formData);
    // 아이디는 서버에서 추가할거임
  };

  const handleSubmit: ChangeEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.target.name;
  };
  const handleImg = () => {
    if (imgRef.current) {
      imgRef.current.click();
    }
  };
  const addBenefit = (benefit: string) => {
    // 배열의 길이가 5를 초과하지 않도록 제한
    if (benefits.length < 5) {
      setBenefits([...benefits, benefit]); // 새로운 배열 생성 및 추가
    } else {
      alert("최대 5개의 값만 입력 가능합니다.");
    }
  };
  const handleBenefit: ChangeEventHandler<HTMLInputElement> = (e) => {
    setBenefitValue(e.target.value);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "companyName":
        setCompanyName(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "employeeCount":
        setEmployeeCount(value);
        break;
      case "location":
        setLocation(value);
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <fieldset>
        <legend>회사 등록하기</legend>
        <form action="submit" onSubmit={handleSubmit}>
          <label htmlFor="companyName">회사명</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            onChange={handleChange}
            value={companyName}
          />
          <label htmlFor="employeeCount">직원 수</label>
          <input
            id="employeeCount"
            type="number"
            name="employeeCount"
            onChange={handleChange}
            value={employeeCount}
          />
          <label htmlFor="benefit">
            복지 (최소 1개 ~ 최대 5개까지 등록가능)
          </label>

          <input
            id="benefit"
            type="text"
            name="benefit"
            value={benefitValue}
            onChange={handleBenefit}
            onKeyDown={(e) => {
              const target = e.target as HTMLInputElement;
              if (e.key === "Enter" && target.value) {
                addBenefit(target.value); // 엔터 키로 값 추가
                target.value = ""; // 입력란 초기화
              }
            }}
          />
          <ul>
            {benefits &&
              benefits.map((benefit: string, index) => (
                <li key={index}>{benefit}</li>
              ))}
          </ul>

          {/* 최소 1개  - 최대 5개 추가 입력받은 값 빈 배열 하나 만들어서 푸시하고 JSON으로 바꿔서 넣어줘도 됨 */}
          <label htmlFor="location">위치</label>
          <input
            id="location"
            type="text"
            name="location"
            onChange={handleChange}
            value={location}
          />
          <label htmlFor="description">회사 설명</label>
          <input
            id="description"
            type="text"
            name="description"
            onChange={handleChange}
            value={description}
          />
          <input type="file" ref={imgRef} />
          <button onClick={handleImg} type="button">
            이미지 등록
          </button>
          <button onClick={onAdd} type="submit">
            저장
          </button>
          {/* 선택한 이미지 추가, 근데 버튼으로 대신 만들기 */}
        </form>
      </fieldset>
    </div>
  );
}

// 등록 페이지 자체는 비로그인 / 유저는 접근 못함. 애초에 접근하지도 못하겠지만, 진짜 만에 하나 주소를 때려맞춰서 들어온다면? 내보내야됨
// 그러니까 어떻게 들어온다고 한들 cookie가 admin이 아니라면 나가야됨. 뭐 또는 관리자 전용 페이지라는 다른 텍스트를 보여주거나

// 이 부분에선 회사가 가지고 있는 데이터가 전부 들어가야함. 그래서 post를 여기서 쏘면 됨
// 이 컴포넌트의 역할은 단지 회사를 추가하는 컴포넌트임
