import Styles from "./index.module.css";
interface SignUpWelcomeProp {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export const SignUpWelcome = ({ setMode }: SignUpWelcomeProp) => {
  return (
    <div className={Styles.signup_content}>
      <h1>Hello, Friend!</h1>
      <p>
        Enter your personal details
        <br />
        and start journey with us
      </p>
      <button className={Styles.signup_btn} onClick={() => setMode(true)}>
        Sign Up
      </button>
    </div>
  );
};
