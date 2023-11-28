import Styles from "./index.module.scss";
import axios from "axios";
import { SocialLoginIcons } from "@/components/SocialLoginIcons";
import { useCallback, useState } from "react";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useQuery } from "@tanstack/react-query";
export const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const handlerOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.id]: e.target.value });
    },
    [user]
  );

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const response = useQuery({
      queryKey: ["/user/login", "login"],
      queryFn: () =>
        DefaultAxiosService.instance.get("/user/login", {
          params: user,
        }),
    });
    console.log(response);
  };

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
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
