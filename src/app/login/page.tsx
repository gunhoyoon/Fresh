"use client";

import { signIn } from "next-auth/react";
// 클라이언트에서의 signIn / 서버에서의 @/auth signIn 이 있음
import { ChangeEventHandler, FormEventHandler, useState } from "react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signIn();
  };
  const onChangeId: ChangeEventHandler<HTMLInputElement> = (e) => {
    setId(e.target.value);
  };
  const onChangePassword: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };
  return (
    <div>
      <form action="submit" onChange={handleSubmit}>
        <fieldset>
          <legend>로그인 정보</legend>
          <label htmlFor="id">ID</label>
          <input
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요."
            onChange={onChangeId}
          />
          <label htmlFor="password">PassWord</label>
          <input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={onChangePassword}
          />
        </fieldset>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
}

// 여기서 로그인한 정보를 가지고 따지는거임
