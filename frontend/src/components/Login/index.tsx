import Styles from "./index.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { CreateAccount } from "./CreateAccount";

export const Login = () => {
  return (
    <div className={Styles.parent_container}>
      <div className={Styles.login_container}>
        <CreateAccount />
      </div>
    </div>
  );
};
