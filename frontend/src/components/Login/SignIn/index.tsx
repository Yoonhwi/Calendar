import Styles from "./index.module.scss";
import axios from "axios";
import { SocialLoginIcons } from "@/components/SocialLoginIcons";
import { useState } from "react";
export const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handlerSubmit = (e: React.FormEvent) => {};
  return (
    <div className={Styles.signin_container}>
      <form className={Styles.form_container} onSubmit={handlerSubmit}>
        <h1>Join Calendar!</h1>
        <SocialLoginIcons />
        <span>or use your email for registration</span>
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handlerOnChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handlerOnChange}
        />
        <a>Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
  );
};
