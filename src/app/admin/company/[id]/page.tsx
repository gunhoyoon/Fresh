"use client";
import { CompanyDetailData } from "@/\butils/companyDetailData";
import { CompanyDataType } from "@/model/CompanyData";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import React from "react";

export default function CompanyDetail() {
  const pathname = usePathname();
  const id = pathname.split("/")[3];
  // id가지고 요청해서 데이터 받아옴
  // 이 페이지에선 그럼 들어오면 useQuery로 데이터 요청하는거임
  const { data } = useQuery<
    CompanyDataType[],
    Object,
    CompanyDataType[],
    [_1: string, _2: string]
  >({
    queryKey: ["company", id],
    queryFn: CompanyDetailData,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log("data", data);
  if (!data) {
    return null;
  }

  return (
    <div>
      {data &&
        data.map((company: CompanyDataType) => (
          <p key={company.companyId}>{company.companyName}</p>
        ))}
    </div>
  );
}
