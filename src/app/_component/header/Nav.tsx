import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import { useCookies } from "@/CookieContext";

export default function Nav() {
  const { userType, setUserType } = useCookies();
  console.log("userType", userType);
  return (
    <ul className={styles.navContainer}>
      <li>
        {userType === "admin" ? (
          <Link href={"/admin/company"}>채용 전체보기</Link>
        ) : (
          <Link href={"/user/company"}>채용 전체보기</Link>
        )}
      </li>
      <li>
        {userType === "admin" ? (
          <Link href={"/admin/company/registration"}>회사 등록하기</Link>
        ) : (
          <Link href={"/"}>2번으로 이동</Link>
        )}
      </li>
      <li>
        <Link href={"/"}>3번으로 이동</Link>
      </li>
      <li>
        <Link href={"/"}>4번으로 이동</Link>
      </li>
    </ul>
  );
}
