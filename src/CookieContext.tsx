"use client";

import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
type UserType = string;
type CookieContextType = {
  userType: UserType;
  setUserType: Dispatch<SetStateAction<UserType>>;
};

const CookieContext = createContext<CookieContextType>({
  userType: "",
  setUserType: () => {},
});

export const useCookies = () => useContext(CookieContext);
type Props = {
  children: React.ReactNode;
};

export const CookieProvider = ({ children }: Props) => {
  const [userType, setUserType] = useState("");

  // 서버에서 전달된 쿠키를 읽어와서 사용자 유형을 설정하는 함수
  const checkUserType = () => {
    const cookie = document.cookie;
    // console.log("cookie", cookie); // 쿠키가 빈 문자열이면 로그인을 안한걸로 조건부처리
    if (cookie.includes("user")) {
      setUserType("user");
    } else if (cookie.includes("admin")) {
      setUserType("admin");
    } else {
      setUserType("");
    }
  };

  // 초기 렌더링 시에 한 번만 사용자 유형을 확인합니다.
  useEffect(() => {
    checkUserType();
  }, []);

  return (
    <CookieContext.Provider value={{ userType, setUserType }}>
      {children}
    </CookieContext.Provider>
  );
};
