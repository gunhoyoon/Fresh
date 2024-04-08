import Link from "next/link";
import styles from "./header.module.css";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.headerContainer}>
        <Link href={"/"}>
          <Logo />
        </Link>
        <Nav />
        <div className={styles.authContainer}>
          <Link href={"/signup"}>회원가입</Link>
          <Link href={"/login"}>로그인</Link>
        </div>
      </div>
    </div>
  );
}
