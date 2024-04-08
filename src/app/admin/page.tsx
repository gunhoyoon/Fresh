import React from "react";
import Controller from "./_component/controller/controller";
import styles from "./admin.module.css";
import CompanyContainer from "./company/CompanyContainer";
export default function AdminPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.adminTop}>
          <h2>관리자 전용 페이지입니다.</h2>
        </div>
      </div>
      <CompanyContainer />
    </div>
  );
}
