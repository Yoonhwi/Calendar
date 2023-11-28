import Styles from "./index.module.scss";
import { SocialLoginIcons } from "@/components/SocialLoginIcons";
import DefaultAxiosService from "@/service/DefaultAxiosService";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
interface SignUpPageProp {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CreateUserProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  login_type: number;
}

export const SignUpPage = ({ setMode }: SignUpPageProp) => {
  const [createUser, setCreateUser] = useState<CreateUserProps>({
    name: "",
    email: "",
    phone: "",
    password: "",
    login_type: 0,
  });

  const [passwordCheck, setPasswordCheck] = useState<string>();
  const [isPassword, setIsPasswordCheck] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setCreateUser({ ...createUser, [e.target.id]: e.target.value });
    },
    [createUser]
  );

  const handlerSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!isPassword) setMessage("비밀번호가 일치하지 않습니다.");
      else {
        setMessage("");
        await DefaultAxiosService.instance
          .post(`/user`, createUser)
          .then(() => {
            router.push("/todo");
          });
      }
      //계정생성 완료시 로그인처리 해주고 todo 페이지로 이동
    },
    [createUser, isPassword, router]
  );

  return (
    <div className={Styles.container}>
      <button className={Styles.btn_goback} onClick={() => setMode(false)}>
        {"<"}
      </button>
      <h1>회원가입</h1>
      <SocialLoginIcons />
      <span>양식에 맞게 입력해주세요!</span>
      <form className={Styles.form_container} onSubmit={handlerSubmit}>
        <input
          type="text"
          id="name"
          placeholder="이름"
          className={Styles.input_nonebtn}
          onChange={onChangeInput}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={Styles.input_nonebtn}
          onChange={onChangeInput}
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호"
          className={Styles.input_nonebtn}
          onChange={onChangeInput}
        />
        <input
          type="password"
          id="passwordCheck"
          placeholder="비밀번호 재입력"
          className={Styles.input_nonebtn}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            if (createUser.password === e.target.value) {
              setIsPasswordCheck(true);
            } else {
              setIsPasswordCheck(false);
            }
          }}
        />
        {message && <span>{message}</span>}
        <input
          type="tel"
          id="phone"
          placeholder="휴대폰 번호 -포함"
          pattern="[0-9]{3}-[0-9]{3,4}-[0-9]{3,4}"
          onChange={onChangeInput}
          className={Styles.input_nonebtn}
        />
        <button
          className={Styles.btn}
          style={{ marginTop: "0.5rem" }}
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};
