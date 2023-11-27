import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./index.module.scss";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
export const SignIn = () => {
  return (
    <div className={Styles.signin_container}>
      <form className={Styles.form_container}>
        <h1>Join Calendar!</h1>
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
        <span>or use your email for registration</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a>Forgot your password?</a>
        <button
          onClick={(e) => {
            e.preventDefault();
            axios
              .get(`http://localhost:8000/users`)
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
