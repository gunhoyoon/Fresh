"use client";
import Link from "next/link";
import styles from "./header.module.css";
import Logo from "./Logo";
import Nav from "./Nav";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCookies } from "@/CookieContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userType, setUserType } = useCookies();

  const logout = useMutation({
    mutationFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("response.json", response.json);
      return response.json();
    },
    onSuccess: () => {
      setUserType("");
      router.push("/");
    },
  });
  const onLogout = () => {
    logout.mutate();
  };
  // console.log("data", data);
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <Nav />
        <div className={styles.authContainer}>
          {userType !== "" ? (
            <>
              <div>{userType}님 반갑습니다</div>
              <div className={styles.logoutButton} onClick={onLogout}>
                로그아웃
              </div>
            </>
          ) : (
            <Link href={"/signin"}>로그인하기</Link>
          )}
        </div>
      </div>
    </div>
  );
}
