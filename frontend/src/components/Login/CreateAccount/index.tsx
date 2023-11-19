import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./index.module.scss";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
export const CreateAccount = () => {
  return (
    <div className={Styles.signup_container}>
      <form action="#" className={Styles.form_container}>
        <h1>Create Account</h1>
        <div className={Styles.social_container}>
          <a href="#">
            <FontAwesomeIcon
              icon={faFacebook}
              size="2x"
              style={{ color: "#c8c8c8" }}
            />
          </a>
          <a href="#">
            <FontAwesomeIcon
              icon={faGoogle}
              size="2x"
              style={{ color: "#c8c8c8" }}
            />
          </a>
        </div>
        <span>or use your email for registration</span>
      </form>
    </div>
  );
};
