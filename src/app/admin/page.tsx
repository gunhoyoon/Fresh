import React from "react";
import styles from "./admin.module.css";
import AdminMain from "./_component/Main";

export default function AdminPage() {
  return (
    <div className={styles.pageContainer}>
      <AdminMain />
    </div>
  );
}
// ssr.
