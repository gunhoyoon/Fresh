import { CompanyDataType } from "@/model/CompanyData";
import { LoginRequest } from "@/model/LoginRequest";
import { raw } from "express";
import { http, HttpResponse } from "msw";
import { collectGenerateParams } from "next/dist/build/utils";
import { requestToBodyStream } from "next/dist/server/body-streams";
import { v4 as uuid } from "uuid";

const users = [
  {
    id: "user01",
    password: "user01",
    role: "user",
    likedCompanies: [],
    chosenBenefits: [],
  },
  { id: "admin01", password: "admin01", role: "admin" },
];
const companyKey = "company";
export const handlers = [
  http.post("/api/signin", async ({ request, cookies }) => {
    console.log("cookies", cookies);
    try {
      const data = (await request.json()) as LoginRequest | undefined;
      if (!data) {
        throw new Error("Invalid request body");
      }

      if (data) {
        const user = users.find(
          (v) => v.id === data.id && v.password === data.password
        );
        if (user) {
          const { password, ...withoutPassword } = user;
          // 비밀번호는 서버에서만 처리함으로 나머지 데이터 반환
          let userType = ""; // 사용자 유형 초기화
          if (user.role === "user") {
            userType = "user"; // 유저인 경우
            localStorage.setItem("user", JSON.stringify(users[0]));
          } else if (user.role === "admin") {
            userType = "admin"; // 어드민인 경우
          }

          // 쿠키 생성
          const cookieValue = `connect.sid=${userType}-cookie;Path=/`;

          return new HttpResponse(JSON.stringify(withoutPassword), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Set-Cookie": cookieValue,
            },
          });
          //유저 , 어드민 , 로그인 X 각각 다른 쿠키사용
        } else {
          // 아이디 또는 비밀번호가 존재하지 않습니다.
          return new HttpResponse(
            JSON.stringify({ message: "Authentication failed" }),
            {
              status: 401,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
        }
      }
    } catch (error) {
      console.error("Error processing signin request:", error);
      return new HttpResponse(
        JSON.stringify({ message: "Internal server error" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }),
  http.post("/api/logout", () => {
    console.log("로그아웃");
    localStorage.removeItem("user");
    return new HttpResponse(JSON.stringify("로그아웃 성공"), {
      headers: {
        "Set-Cookie": "connect.sid=;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/api/initCompany", async () => {
    let initData = localStorage.getItem(companyKey);
    if (!initData) {
      const companyData: CompanyDataType[] = [
        {
          companyName: "테크이노베이트",
          employeeCount: 150,
          benefits: [
            "스포츠 클럽 지원",
            "연차 휴가 30일",
            "원격 근무 옵션",
            "업무용 핸드폰 지급",
            "재택 근무 지원",
          ],
          location: "서울, 강남구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjExMDZfMjcg%2FMDAxNjY3NzM4NjE1NDAw.qWbvs4YRSFmNQz-XZe-faEuKDOOZh5phSt50YVrJTj4g.fGDWUiUhQKYKf6HO5TKrUkznd2t5ARkLS1eJLEL69q4g.PNG.josephk1010%2F%25B3%25D7%25C0%25CC%25B9%25F6%25B7%25CE%25B0%25ED_%25B8%25F0%25C0%25DA%25C0%25D6%25B4%25C2%25B0%25CD-01.png&type=sc960_832",
          companyId: "C001",
          description:
            "지속 가능한 개발과 첨단 기술에 전념하는 AI 솔루션 분야의 선도 기업.",
          like: 130,
        },
        {
          companyName: "그린테크솔루션",
          employeeCount: 200,
          benefits: [
            "유연 근무시간",
            "주 35시간 근무제",
            "교통비 지원",
            "업무용 핸드폰 지급",
            "도서 구입비 지원",
          ],
          location: "부산, 해운대구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA2MDVfMTAz%2FMDAxNjIyODk4MzY2ODI2.fL0OkviH_TsIhIC20rfMAuGTvydHMXNX525E2wepXZMg.ddEwQh-7QjEiq-8CLda390Qqh3VDHhhpYlZmLbVS1Ggg.JPEG.kjher310%2Fkakao_sample.jpg&type=sc960_832",
          companyId: "C002",
          description:
            "스마트 기술로 지속 가능한 미래를 강화하는 재생 에너지 솔루션에 전념하는 회사.",
          like: 80,
        },
        {
          companyName: "핀시큐어",
          employeeCount: 75,
          benefits: [
            "휴가비 지원",
            "업무용 핸드폰 지급",
            "자기개발비 지원",
            "출장 경비 지원",
            "자녀 교육 지원",
          ],
          location: "인천, 연수구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5529%2F2018%2F01%2F31%2F2018013114171900862d307c1aeb0121131233211_20180131141829640.jpg&type=sc960_832",
          companyId: "C003",
          description:
            "전 세계 거래를 보호하는 금융 보안 소프트웨어를 전문으로 합니다.",
          like: 200,
        },
        {
          companyName: "넥스트모빌리티",
          employeeCount: 50,
          benefits: [
            "노트북 및 IT 지원",
            "연간 건강검진",
            "체육관 회원권",
            "원격 근무 옵션",
            "자녀 교육 지원",
          ],
          location: "대구, 수성구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDAyMTJfMTEx%2FMDAxNzA3NzExNTE1Njkz.BXjoVEMPtQ_J77ZxCdxWC5RN2i1IxlJNPwMrTWUA9pkg.Et8pvxU3_9HgqHdEMnyd1KOkjYEB9wqdwoAF_mq1ZAog.JPEG.mblue24%2F%25C4%25ED%25C6%25CE_%25B7%25CE%25B0%25ED.jpg&type=sc960_832",
          companyId: "C004",
          description:
            "혁신적인 이동 수단 솔루션을 개발하여 현대 도시의 교통 문제를 해결합니다.",
          like: 150,
        },
        {
          companyName: "에코플랜트",
          employeeCount: 120,
          benefits: [
            "저녁 식사 지원",
            "주 35시간 근무제",
            "직원 리트리트",
            "사내 체육 시설",
            "원격 근무 옵션",
          ],
          location: "광주, 북구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDZfMTkg%2FMDAxNjYyNDMyMzYxMDcz.uquGjs__rmlPr5c4HCd4XSgnTLL8HiwDQQ_H85SfkAcg.QR-2V-MddbKSaxM609Iaf4CrQ40Pm8iu6DkPy2f3JdAg.JPEG.brandioco%2F%25C8%25AD%25B8%25E9_%25C4%25B8%25C3%25B3_2022-09-06_114551.jpg&type=sc960_832",
          companyId: "C005",
          description:
            "환경 친화적인 식물 기반 기술로 지속 가능한 농업을 추구하는 기업.",
          like: 120,
        },
        {
          companyName: "블루웨이브",
          employeeCount: 100,
          benefits: [
            "경조사비 지급",
            "피트니스 보조금",
            "셔틀 버스 운행",
            "사내 어학 수업",
            "교육비 지원",
          ],
          location: "울산, 남구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDA5MDdfMTM1%2FMDAxNTk5NDgyMDUwOTU2.2w0UTphhYWb1ujmM779POtmDaoHu8lV68lderSfhi18g.1fyrmnQGlXdabrUq8lF9kqZyqy67JZqKQzRwJbrj8PYg.PNG.clarkbubble%2Fimage.png&type=sc960_832",
          companyId: "C006",
          description:
            "해양 자원을 이용하여 청정 에너지 솔루션을 제공하는 선도 기업.",
          like: 100,
        },
        {
          companyName: "데이터리치",
          employeeCount: 80,
          benefits: [
            "출장 경비 지원",
            "유연 근무제",
            "주 35시간 근무제",
            "워크샵 및 팀 빌딩",
            "노트북 및 IT 지원",
          ],
          location: "서울, 서초구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5380%2F2022%2F09%2F05%2F0000723821_001_20220905100804557.jpg&type=sc960_832",
          companyId: "C007",
          description:
            "데이터 분석 및 처리 기술을 통해 비즈니스 인사이트를 제공하는 기업.",
          like: 500,
        },
        {
          companyName: "헬스코드",
          employeeCount: 130,
          benefits: [
            "재택 근무 지원",
            "연차 휴가 자유 사용",
            "자동차 리스 지원",
            "건강 보험",
            "사내 치료실",
          ],
          location: "대전, 중구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjEyMjhfMTYw%2FMDAxNjcyMjAzMDE1NTU5.vpnA0cSIHbVmJ7LHypXfwKZ5l7a7kHP2iNUjlCqM7wkg.DR7lrsxVe0NtyJbb5SmXsEjYaDsdrWwEiG-jXSykOC0g.PNG.masscg1005%2F%25C1%25F7%25B9%25E61.png&type=sc960_832",
          companyId: "C008",
          description:
            "의료 데이터를 활용하여 혁신적인 건강 관리 솔루션을 개발하는 기업.",
          like: 400,
        },
        {
          companyName: "아이테크비전",
          employeeCount: 90,
          benefits: [
            "연차 휴가 자유 사용",
            "지속 가능성 인센티브",
            "교육비 지원",
            "연간 건강검진",
            "주 4일 근무제",
          ],
          location: "제주, 제주시",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fimgnews.naver.net%2Fimage%2F5090%2F2017%2F06%2F08%2F0001472047_001_20170608143616943.jpg&type=sc960_832",
          companyId: "C009",
          description:
            "인공 지능과 기계 학습을 이용한 첨단 기술을 개발하는 회사.",
          like: 320,
        },
        {
          companyName: "넷시큐어",
          employeeCount: 60,
          benefits: [
            "재택 근무 지원",
            "점심 제공",
            "저녁 식사 지원",
            "사내 치료실",
            "주 4일 근무제",
          ],
          location: "서울, 종로구",
          logoUrl:
            "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA0MDVfMTg0%2FMDAxNjE3NjI2NTI4NjE5.TBfvue1_Od6ZiuDKBB-6onDicXKEYPClFzKlRxa3nd8g.pTQaLb8Y0UK8lxL1kPVaVTaFxQOf9iCJoavEv5_AQTkg.JPEG.sorryklol%2FFacebook-logo-768x538.jpg&type=sc960_832",
          companyId: "C010",
          description:
            "최첨단 보안 기술과 솔루션을 제공하여 디지털 자산을 보호하는 기업.",
          like: 30,
        },
      ];
      localStorage.setItem(companyKey, JSON.stringify(companyData));
      initData = JSON.stringify(companyData);
    }

    return new HttpResponse(initData, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  // 어드민은 포스트하고 추가된 데이터까지 리턴하면 되지만 유저나 비로그인은 본인이 추가할 수 없기 때문에, 새로 가져와야함, 아 일단 어드민부터..
  http.get("/api/admin/company/:id", async ({ params }) => {
    const { id } = params;
    // console.log("id", id);
    const initData = localStorage.getItem(companyKey) || "[]";
    const rawData = JSON.parse(initData);
    // const findCompany = rawData.find(
    //   (v: CompanyDataType) => v.companyId === id
    // );
    const findCompany = rawData.filter(
      (v: CompanyDataType) => v.companyId === id
    );

    return new HttpResponse(JSON.stringify(findCompany), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.get("/api/admin/searchCompany", async ({ request }) => {
    const url = new URL(request.url);
    const initData = localStorage.getItem(companyKey) as string;

    const searchTerm = url?.searchParams.get("searchTerm");
    if (searchTerm) {
      const copyData: CompanyDataType[] = JSON.parse(initData);
      const searchData = copyData.filter((company: CompanyDataType) =>
        company.companyName.includes(searchTerm as string)
      );
      return new HttpResponse(JSON.stringify(searchData), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new HttpResponse(initData, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }),
  http.put("/api/admin/company", async ({ request }) => {
    const newData = (await request.json()) as CompanyDataType;
    // console.log("newData", newData);
    const initData = localStorage.getItem(companyKey) || "[]";
    const rawData: CompanyDataType[] = JSON.parse(initData);
    const findDataIndex = rawData.findIndex(
      (company) => company.companyId === newData.companyId
    );

    // 데이터 업데이트
    if (findDataIndex >= 0) {
      rawData[findDataIndex] = { ...rawData[findDataIndex], ...newData }; // 기존 데이터 업데이트
    } else {
      rawData.push(newData); // ID에 해당하는 데이터가 없으면 새로운 객체 추가
    }

    // 로컬 스토리지에 데이터 저장
    localStorage.setItem(companyKey, JSON.stringify(rawData)); // 업데이트된 데이터로 스토리지 저장

    return new HttpResponse(JSON.stringify(rawData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
  http.delete("/api/admin/delCompany", async ({ request }) => {
    const url = new URL(request.url);
    const companyId = url.searchParams.get("id") || [];
    if (!companyId) {
      return new HttpResponse("Company ID is required", {
        status: 400,
      });
    }
    const initData = localStorage.getItem(companyKey) || "[]";
    const rawData: CompanyDataType[] = JSON.parse(initData);

    const filterData = rawData.filter(
      (company) => company.companyId !== companyId
    );
    // console.log("filterData", filterData);

    localStorage.setItem(companyKey, JSON.stringify(filterData));
    return new HttpResponse(JSON.stringify(filterData), {
      status: 200,
    });
  }),
  http.post("/api/admin/addCompany", async ({ request }) => {
    const formData = await request.formData();

    const companyName = formData.get("companyName");
    const benefits = formData.get("benefits");
    const location = formData.get("location");
    const description = formData.get("description");
    console.log("companyName", companyName);
    console.log("benefits", benefits);
    console.log("location", location);
    console.log("description", description);
    // 포스트 데이터 전달해서, 입력받은 값 이번엔 formData 사용해서, 하나씩 꺼내서 객체로 만들어서
    // 기존 로컬 데이터에 push 하고 전체 반환 . queryKey = company 로 업데이트 / 추가 되었습니다 - 홈으로 redirect
    return new HttpResponse("나에게 닿기를", {
      status: 200,
    });
  }),
];
