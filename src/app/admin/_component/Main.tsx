"use client";
import { initCompanyData } from "@/\butils/initCompanyData";
import { CompanyDataType } from "@/model/CompanyData";
import { useQuery } from "@tanstack/react-query";
import styles from "./main.module.css";
import React from "react";
import line from "next-auth/providers/line";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminMain() {
  const router = useRouter();
  const { data: companyData, isPending } = useQuery<CompanyDataType[]>({
    queryKey: ["company"],
    queryFn: initCompanyData,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const sortedCompanyData = companyData
    ?.sort((a, b) => a.like - b.like)
    .slice(0, 4); // 유저의 관심도가 낮은 회사 정렬
  const sortedAscending = companyData
    ?.sort((a, b) => b.like - a.like)
    .slice(0, 4); //

  return (
    <div className={styles.mainContainer}>
      <section>
        <h2>적극 채용중인 회사</h2>
        <ul>
          {sortedCompanyData &&
            sortedCompanyData.map((company: CompanyDataType) => (
              <li
                onClick={() => {
                  router.push(`/admin/company/${company.companyId}`);
                }}
                key={company.companyId}
              >
                {/* <Link href={`admin/company/${company.companyId}`}> */}
                <div className={styles.successBonus}>합격보상금 300만원</div>
                <div>
                  <img src={company.logoUrl} alt="회사 로고" />
                </div>
                <div className={styles.companyDes}>
                  <p>프론트엔드 개발자(신입)</p>
                  <p className={styles.companyTitle}>{company.companyName}</p>
                </div>
                {/* </Link> */}
              </li>
            ))}
        </ul>
      </section>
      <div className={styles.imgContainer}>
        <h3>신입에게 기회를 !!</h3>
        <img
          src="https://image.wanted.co.kr/optimize?src=https%3A%2F%2Fstatic.wanted.co.kr%2Fimages%2Fbanners%2F2305%2Fc045f220.jpg&w=1060&q=100"
          alt="신입에게 기회를"
        />
      </div>
      <section>
        <h2>요즘 핫한 회사</h2>
        <ul>
          {sortedAscending &&
            sortedAscending.map((company: CompanyDataType) => (
              <li
                key={company.companyId}
                onClick={() => {
                  router.push(`admin/company/${company.companyId}`);
                }}
              >
                {/* <Link href={`admin/company/${company.companyId}`}> */}
                <div className={styles.successBonus}>합격보상금 300만원</div>
                <div>
                  <img src={company.logoUrl} alt="회사 로고" />
                </div>
                <p>프론트엔드 개발자(신입)</p>
                <p className={styles.companyTitle}>{company.companyName}</p>
                {/* </Link> */}
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
