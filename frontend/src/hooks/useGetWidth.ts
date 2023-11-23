import { useEffect, useMemo, useState } from "react";

const lodash = require("lodash");

export const useGetWidth = (mode: boolean) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getWidth = useMemo(() => {
    const mobileStyle = {
      height: "20rem",
      top: "15rem",
      margin: "0 auto",
    };

    const style = {
      height: "20rem",
      top: "15rem",
      left: "15rem",
    };

    const style2 = {};

    if (mode) {
      if (windowWidth <= 900) {
        return { width: "80%", ...mobileStyle };
      } else if (windowWidth <= 1200) {
        return { width: "20%", ...style };
      } else {
        return { width: "16%", ...style };
      }
    } else {
      return { width: "40%", height: "40rem" };
    }
  }, [mode, windowWidth]);

  return getWidth;
};
