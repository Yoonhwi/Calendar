import Styles from "./index.module.scss";
import { SocialLoginIcons } from "@/components/SocialLoginIcons";
import { useCallback, useEffect, useState } from "react";
import { getFetch, useGetWithParams } from "@/api/apis";
import { ApiRoutes } from "@/constants/routes";
import { useRouter } from "next/router";

export const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();

  const { data, refetch } = useGetWithParams({
    url: ApiRoutes.UserLogin,
    fn: () => getFetch({ url: ApiRoutes.UserLogin, params: user }),
    params: user,
  });

  const handlerOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.id]: e.target.value });
    },
    [user]
  );

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
    !data && console.log("로그인 실패");
    router.push("/todo");
  };

  useEffect(() => {
    if (data) {
    }
  }, [data]);

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
