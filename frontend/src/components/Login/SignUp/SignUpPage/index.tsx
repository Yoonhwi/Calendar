import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./index.module.scss";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
interface SignUpPageProp {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SignUpPage = ({ setMode }: SignUpPageProp) => {
  return (
    <div className={Styles.container}>
      <button className={Styles.btn_goback} onClick={() => setMode(false)}>
        {"<"}
      </button>
      <h1>회원가입</h1>
      <div className={Styles.social_container}>
        <a>
          <FontAwesomeIcon
            icon={faFacebook}
            size="2x"
            style={{ color: "#fff" }}
          />
        </a>
        <a href="#">
          <FontAwesomeIcon
            icon={faGoogle}
            size="2x"
            style={{ color: "#fff" }}
          />
        </a>
      </div>
      <span>양식에 맞게 입력해주세요!</span>
      <input type="text" placeholder="이름" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="비밀번호" />
      <div className={Styles.input_flex}>
        <input type="text" placeholder="휴대폰" />
        <button>인증</button>
      </div>
      <div className={Styles.input_flex}>
        <input type="text" placeholder="인증번호" />
        <button>제출</button>
      </div>
      <button
        className={Styles.btn}
        style={{ marginTop: "0.5rem" }}
        type="submit"
      >
        Sign Up
      </button>
    </div>
  );
};
