import { LoginRequest } from "@/model/LoginRequest";
import { http, HttpResponse } from "msw";
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
    return new HttpResponse(JSON.stringify("로그아웃 성공"), {
      headers: {
        "Set-Cookie": "connect.sid=;Path=/;Max-Age=0",
      },
    });
  }),
  http.get("/api/company", async () => {
    // localStorage.setItem("company");
    return new HttpResponse("대충 회사 목록 반환", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),

  http.post("/api/admin/initCategory", async () => {
    // if (!initData) {
    //   // 여기에 목 데이터를 생성하는 로직   을 추가
    //   const mockData = []; // 예시 데이터

    //   //   initData = JSON.stringify(mockData);
    // }

    return new HttpResponse("성공", {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }),
];
