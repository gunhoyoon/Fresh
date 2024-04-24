"use client";
import Link from "next/link";
import React, { FormEventHandler } from "react";
import styles from "./controller.module.css";

export default function Controller() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };
  // 여기선 검색할 아이템, 그 벨류만 전달해주면 됨. 그러니까 컨테이너에서 벨류 받을 함수하나 내려주면 거기에 전달하면 됨
  // 그리고 컨테이너에서 그 조건에 맞는 회사를 리스트에 전달하는거임,
  // 검색어를 요청한다.
  return (
    <div className={styles.controllerContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <label htmlFor="search" className={styles.label}></label>
        <div className={styles.inputGroup}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="검색어를 입력하세요"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            검색하기
          </button>
        </div>
      </form>
    </div>
  );
}
