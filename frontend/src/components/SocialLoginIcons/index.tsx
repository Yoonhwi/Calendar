import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Styles from "./index.module.css";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
export const SocialLoginIcons = () => {
  return (
    <div className={Styles.social_container}>
      <a>
        <FontAwesomeIcon
          icon={faFacebook}
          size="2x"
          style={{ color: "#fff" }}
        />
      </a>
      <a href="#">
        <FontAwesomeIcon icon={faGoogle} size="2x" style={{ color: "#fff" }} />
      </a>
    </div>
  );
};
