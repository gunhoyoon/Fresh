"use client";
import React from "react";
import CompanyList from "./CompanyList";
import styles from "./companyContainer.module.css";
import Controller from "../_component/controller/controller";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { initCompanyData } from "@/\butils/initCompanyData";
import { CompanyDataType } from "@/model/CompanyData";

export default function CompanyContainer() {
  const queryClient = useQueryClient();
  // 여기서 회사 데이터 요청
  const { data: companyData, isPending } = useQuery<CompanyDataType[]>({
    queryKey: ["company"],
    queryFn: initCompanyData,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  console.log("companyData", companyData);
  // 해당 데이터를 리스트에 내려준다.
  // 삭제나 뭐 다른것들을 컨테이너에서 하고 리스트는 오직 보여주는것만 할거임(아이템당 좋아요나)
  // 컨테이너에서 메인 페이지

  const search = useMutation({
    mutationFn: async (searchTerm: string) => {
      const searchData = await fetch(
        `/api/admin/searchCompany?searchTerm=${searchTerm}`,
        {
          method: "GET",
        }
      );
      if (!searchData.ok) {
        throw new Error("에러발생 !!");
      }
      return searchData.json();
    },
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.setQueryData(["company"], data);
      // queryClient.invalidateQueries({ queryKey: ["company"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const onSearch = (searchTerm: string) => {
    search.mutate(searchTerm);
  };
  if (isPending) {
    return <div>로딩중 ...</div>;
  }

  if (!companyData) {
    return null;
  }
  // 뮤텡
  return (
    <div className={styles.listContainer}>
      <Controller onSearch={onSearch} />
      <CompanyList companyData={companyData} />
    </div>
  );
}
// 일단 목록은 컨테이너가 기본이지만, 회사 상세를 들어갈 때도 밑에 그 회사를 제외한 다른 회사들도 나와야하기 떄문에, 리스트는 컴포넌트화가 맞음
// 컴퍼니 컨테이너, 회사 등록, 정보 수정, 삭제, 조회
// 추가 누르면 추가 페이지
// 이미 추가된 목록에서 수정을 누르면 아이디 가지고 수정페이지
