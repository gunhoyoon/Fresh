"use client";

import { delay } from "@/\butils/delay";
import { LoginRequest } from "@/model/LoginRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import styles from "./login.module.css";
import { useCookies } from "@/CookieContext";
export default function SignInPage() {
  const { userType, setUserType } = useCookies();
  // console.log("userType", userType);
  const queryClient = useQueryClient();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loginType, setLoginType] = useState("user");
  useEffect(() => {
    if (loginType === "user") {
      setId("user01");
      setPassword("user01");
    } else if (loginType === "admin") {
      setId("admin01");
      setPassword("admin01");
    }
  }, [loginType]);
  if (userType !== "") {
    router.push("/");
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ id, password }: LoginRequest) => {
      // await delay(2000);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/signin`,
        {
          method: "POST",
          body: JSON.stringify({ id, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: (data) => {
      if (id === "user01") {
        setUserType("user");
      } else {
        setUserType("admin");
      }
      console.log("data", data);
      // queryClient.setQueryData(["user"], data);
      router.push("/");
    },
  });
  const onClickUser = () => {
    // setUserType("user");
    setLoginType("user");
  };
  const onClickAdmin = () => {
    // setUserType("admin");
    setLoginType("admin");
  };
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    mutate({ id, password });
  };

  return (
    <div className={styles.LoginContainer}>
      {/* {isPending && <div>로그인 중 ...</div>} */}
      <div className={styles.LoginContainerInner}>
        <div className={styles.LoginTabContainer}>
          <button
            className={`${styles.LoginTabButton} ${
              loginType === "user" ? styles.active : ""
            }`}
            onClick={onClickUser}
          >
            유저 로그인
          </button>
          <button
            className={`${styles.LoginTabButton} ${
              loginType === "admin" ? styles.active : ""
            }`}
            onClick={onClickAdmin}
          >
            어드민 로그인
          </button>
        </div>
        <div className={styles.LoginFormContainer}>
          <form action="submit" onSubmit={handleSubmit}>
            <fieldset>
              <legend></legend>
              <label htmlFor="id">ID</label>
              <input
                type="text"
                name="id"
                placeholder="아이디를 입력해주세요."
                value={id}
                readOnly
              />
              <label htmlFor="password">PassWord</label>
              <input
                type="text"
                name="password"
                value={password}
                placeholder="비밀번호를 입력해주세요."
                readOnly
              />
            </fieldset>
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </div>
  );
}

// 여기서 로그인한 정보를 가지고 따지는거임
