"use client";
import { CompanyDataType } from "@/model/CompanyData";
import Link from "next/link";
import React from "react";
import styles from "./companyList.module.css";
import { useRouter } from "next/navigation";
type Props = {
  companyData: CompanyDataType[];
};

export default function CompanyList({ companyData }: Props) {
  const router = useRouter();
  return (
    <section className={styles.mainContainer}>
      <h2 className={styles.srOnly}>회사 전체보기</h2>
      <ul>
        {companyData &&
          companyData.map((company: CompanyDataType) => (
            <li
              key={company.companyId}
              onClick={() => {
                router.push(`/admin/company/${company.companyId}`);
              }}
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
  );
}
