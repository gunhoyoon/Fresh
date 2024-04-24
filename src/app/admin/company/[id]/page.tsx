"use client";
import { CompanyDetailData } from "@/\butils/companyDetailData";
import { CompanyDataType } from "@/model/CompanyData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { MouseEventHandler, useEffect, useState } from "react";
import styles from "./companyDetail.module.css";

export default function CompanyDetail() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split("/")[3];
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
  const [modify, setModify] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data && data.length > 0) {
      // modify가 true일 때 첫 번째 회사 이름 설정
      const firstCompany = data[0]; // 첫 번째 요소 추출
      setCompanyName(firstCompany.companyName);
      setLocation(firstCompany.location);
      setDescription(firstCompany.description);
    }
  }, [data, modify]);

  // console.log("data", data);
  const createUpdatedData = (
    original: CompanyDataType,
    updatedFields: Partial<CompanyDataType>
  ): CompanyDataType => {
    return {
      ...original,
      ...updatedFields,
    }; // 기존값 + 업데이트할 값 = mutate 인자
  };
  const handleModify: MouseEventHandler<HTMLButtonElement> = () => {
    setModify(true);
  };
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = () => {
    if (data && data.length > 0) {
      const originalData = data[0]; // 기존 데이터
      const updatedFields = {
        companyName,
        location,
        description,
      };

      // 수정된 필드를 기존 데이터와 결합
      const updatedData = createUpdatedData(originalData, updatedFields);

      // mutate로 데이터 전송
      putMutate(updatedData); // 객체를 직접 전달
    }
  };
  const handlerCancel: MouseEventHandler<HTMLButtonElement> = () => {
    setModify(false);
  };
  const queryClient = useQueryClient();

  const { mutate: putMutate } = useMutation({
    // 여기에 바꿀 데이터 넣고 요청
    mutationFn: async (updatedData: CompanyDataType) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/company`,
        {
          method: "PUT",
          body: JSON.stringify(updatedData),
        }
      );
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("data", data);

      const prevData = queryClient.getQueryData<CompanyDataType[]>([
        "company",
        id,
      ]);
      const updatedData = prevData?.map((company) => {
        if (company.companyId === data.id) {
          return { ...company, ...data };
        }
        return company;
      });
      // queryClient.setQueryData(["company", id], updatedData);
      // 값은 바꾸지만 즉각적용이 안됨 - 서버와의 동기화가 안된다.
      queryClient.invalidateQueries({ queryKey: ["company"] });
      setModify(false);
      // success 시 전체 데이터를 전달받고, 쿼리키를 통해 상세 페이지에서 요청한 데이터와 아이디를 비교해서
      // 기존 데이터에 새로운 데이터 덮어주고, 업데이트된 최종 데이터를 기지고 쿼리키에 맞게 셋해줌
    },
    onError: () => {},
  });
  const { mutate: delMutate } = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/admin/delCompany?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      return response.json();
    },
    onSuccess: (data) => {
      console.log("삭제 성공");
    },
    onError: () => {
      console.log("삭제 실패");
    },
  });
  if (!data) {
    return null;
  }

  return (
    <div className={styles.detailContainer}>
      {data &&
        data.map((company: CompanyDataType) => (
          <div key={company.companyId} className={styles.detailInner}>
            <div className={styles.imgContainer}>
              <img src={company.logoUrl} alt="회사로고" />
            </div>
            {/* 화사명 */}
            <div className={styles.infoContainer}>
              <>
                {modify ? (
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => {
                      setCompanyName(e.target.value);
                    }}
                  />
                ) : (
                  <h3 className={styles.title}>{company.companyName} ∙</h3>
                )}
                {modify ? (
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                    }}
                  />
                ) : (
                  <p className={styles.address}>{company.location}</p>
                )}
              </>

              {/* 회사주소 */}

              {/* 설명 */}
              {modify ? (
                <input
                  type="text"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              ) : (
                <p className={styles.des}>{description}</p>
              )}

              {/* 직원 수 */}
              <p className={styles.count}>{company.employeeCount}명+</p>
              {/* 복지 - 태그 느낌으로 */}
              <div className={styles.benefitContainer}>
                {company.benefits.map((benefit: string, index: number) => (
                  <span className={styles.benefitTag} key={index}>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      {modify ? (
        <button onClick={handleSubmit}>저장</button>
      ) : (
        <button onClick={handleModify}>수정</button>
      )}
      {modify ? (
        <button onClick={handlerCancel}>취소</button>
      ) : (
        <button>삭제</button>
      )}
      {/* <button>삭제</button> */}
    </div>
  );
}
// 상세 데이터 불러왔으니까 이제 데이터 가지고 활용하기
// 그리고 핸들러 예외처리 안되어있음
