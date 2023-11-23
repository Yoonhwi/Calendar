import Styles from "./index.module.css";
import { useRouter } from "next/router";

export const SignUp = () => {
  const router = useRouter();

  return (
    <div className={Styles.signup_container}>
      <div className={Styles.signup_content}>
        <h1>Hello, Friend!</h1>
        <p>
          Enter your personal details
          <br />
          and start journey with us
        </p>
        <button
          className={Styles.signup_btn}
          onClick={() => router.push("/todo")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
