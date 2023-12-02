import Styles from "./index.module.scss";
import { SignIn } from "./SignIn";
import { SignUp } from "./SignUp";

export const Login = () => {
  return (
    <div className={Styles.parent_container}>
      <div className={Styles.login_container}>
        <SignIn />
        <SignUp />
      </div>
    </div>
  );
};
