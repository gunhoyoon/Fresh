"use client";
import Link from "next/link";
import React, { FormEventHandler } from "react";
import styles from "./controller.module.css";

export default function Controller() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  return (
    <div className={styles.controllerContainer}>
      <form action="submit" onChange={handleSubmit}>
        <label htmlFor="search"></label>
        <input type="text" name="search" />
        <button type="submit">검색하기</button>
      </form>

      <Link href={"/admin/company/registration"}>회사 등록하기</Link>
    </div>
  );
}
