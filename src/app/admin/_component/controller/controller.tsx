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
