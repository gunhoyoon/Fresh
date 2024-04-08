import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
export default function Nav() {
  return (
    <ul className={styles.navContainer}>
      <li>
        <Link href={"/"}>1번으로 이동</Link>
      </li>
      <li>
        <Link href={"/"}>2번으로 이동</Link>
      </li>
      <li>
        <Link href={"/"}>3번으로 이동</Link>
      </li>
      <li>
        <Link href={"/"}>4번으로 이동</Link>
      </li>
    </ul>
  );
}
