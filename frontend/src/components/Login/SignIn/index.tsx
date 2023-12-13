import Styles from "./index.module.scss";
import { SocialLoginIcons } from "@/components/SocialLoginIcons";
import { useCallback, useEffect, useState } from "react";
import { getFetch, useGet, useGetWithParams } from "@/api/apis";
import { ApiRoutes } from "@/constants/routes";
import { useRouter } from "next/router";
import DefaultAxiosService from "@/service/DefaultAxiosService";

export const SignIn = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const router = useRouter();

  const { refetch } = useGetWithParams(
    ApiRoutes.UserLogin,
    () => getFetch({ url: ApiRoutes.UserLogin, params: user }),
    user,
    {
      staleTime: 0,
    }
  );

  const { data: userData, refetch: refetchUserData } = useGet(
    ApiRoutes.Token,
    () => getFetch({ url: ApiRoutes.Token })
  );

  const handlerOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser({ ...user, [e.target.id]: e.target.value });
    },
    [user]
  );

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    refetch().then((res) => {
      DefaultAxiosService.addHeaderToken(res.data);
      if (!res) return;
      refetchUserData();
    });
  };

  useEffect(() => {
    const handleRedirect = async () => {
      if (!!userData) {
        await router.push("/todo");
      }
    };

    handleRedirect();
  }, [router, userData]);

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
