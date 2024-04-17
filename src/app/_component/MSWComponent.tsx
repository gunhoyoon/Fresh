"use client";
import { handlers } from "@/mocks/handler";
import { ReactNode, useEffect, useState } from "react";

type Props = {
  children: ReactNode;
};
export const MSWComponent = ({ children }: Props) => {
  const [isMswReady, setMswReady] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        require("@/mocks/browser");
        const msw = require("msw/browser");
        msw
          .setupWorker(...handlers)
          .start()
          .then(() => {
            setMswReady(true);
          });
      } else {
        setMswReady(false);
      }
    }
    // 테스트에서 제공하는 목 함수에 내 벨리데이션 함수를 집어넣는다. 테스트 단위를 어디까지 이 친구의 책임인지? 내 역할만 수행하면ㅇㅋ 각 함수가 이어져있다면
  }, []);
  if (!isMswReady) {
    return <div>Loading ...</div>;
  }

  return <>{children}</>;
};

// msw/browser를 가져올 때, 해당 코드가 서버에서 불려지기 때문에, if문을 넣어서 에러를 처리해줘야함
// 그리고 서비스 워커 등록하는 작업이 비동기로 작동하므로 애플리케이션 렌더링을 그때까지 연기하는게 좋음

// 그래서 msw 상태를 하나 만들어서, start가 성공적으로 된 후에 true로 바꿔줌, 이 전에는 로딩
