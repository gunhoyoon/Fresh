import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";
export const handlers = [
  http.get("/api/login", async () => {}),
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
