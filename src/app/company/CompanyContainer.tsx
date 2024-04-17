"use client";
import React from "react";
import CompanyList from "./CompanyList";
import Controller from "../admin/_component/controller/controller";
import styles from "./companyContainer.module.css";
import { useCookies } from "@/CookieContext";
export default function CompanyContainer() {
  const { userType, setUserType } = useCookies();
  return (
    <div className={styles.listContainer}>
      {userType === "" ? (
        <div>비로그인</div>
      ) : userType === "user" ? (
        <div>유저로그인</div>
      ) : (
        <div>어드민로그인</div>
      )}
      <Controller userType={userType} />
      <CompanyList />
    </div>
  );
}
// 일단 목록은 컨테이너가 기본이지만, 회사 상세를 들어갈 때도 밑에 그 회사를 제외한 다른 회사들도 나와야하기 떄문에, 리스트는 컴포넌트화가 맞음
// 컴퍼니 컨테이너, 회사 등록, 정보 수정, 삭제, 조회
// 추가 누르면 추가 페이지
// 이미 추가된 목록에서 수정을 누르면 아이디 가지고 수정페이지
