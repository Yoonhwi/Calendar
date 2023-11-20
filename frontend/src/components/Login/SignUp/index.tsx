import Styles from "./index.module.css";
export const SignUp = () => {
  return (
    <div className={Styles.signup_container}>
      <div className={Styles.signup_content}>
        <h1>Hello, Friend!</h1>
        <p>
          Enter your personal details
          <br />
          and start journey with us
        </p>
        <button className={Styles.signup_btn}>Sign Up</button>
      </div>
    </div>
  );
};
