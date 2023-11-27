import Styles from "./index.module.css";
import { useRouter } from "next/router";
import { SignUpWelcome } from "./SignUpWelcome";
import { useState } from "react";
import { SignUpPage } from "./SignUpPage";

const { CSSTransition } = require("react-transition-group");

export const SignUp = () => {
  const [mode, setMode] = useState(false);
  const router = useRouter();

  return (
    <div className={Styles.signup_container}>
      <CSSTransition
        in={mode}
        timeout={500}
        classNames={{
          enter: Styles.transition_enter,
          enterActive: Styles.transition_enter_active,
          exit: Styles.transition_exit,
          exitActive: Styles.transition_exit_active,
        }}
        unmountOnExit
      >
        <SignUpPage setMode={() => setMode(false)} />
      </CSSTransition>
      <CSSTransition
        in={!mode}
        timeout={500}
        classNames={{
          enter: Styles.transition_enter,
          enterActive: Styles.transition_enter_active,
          exit: Styles.transition_exit,
          exitActive: Styles.transition_exit_active,
        }}
        unmountOnExit
      >
        <SignUpWelcome setMode={() => setMode(true)} />
      </CSSTransition>
    </div>
  );
};
