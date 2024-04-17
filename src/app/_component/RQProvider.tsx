"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

type Props = {
  children: React.ReactNode;
};

const options = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retryOnMount: true,
      refetchOnReconnect: false,
      retry: false,
    },
  },
};

const queryClient = new QueryClient(options);
// 프로바이더로 감싼 칠드런(컴포넌트들)은 리액트 쿼리로 데이터 공유가 다 된다.
function RQProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      />
    </QueryClientProvider>
  );
}

export default RQProvider;
