import styles from "./signup.module.css";

export default function SignUpPage() {
  return (
    <div>
      <h2>회원가입</h2>
      <form action="submit">
        <fieldset>
          <legend>사용자 정보</legend>
          <label htmlFor="id">ID</label>
          <input type="text" id="id" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </fieldset>
        <button type="submit">가입하기</button>
      </form>
    </div>
  );
}
