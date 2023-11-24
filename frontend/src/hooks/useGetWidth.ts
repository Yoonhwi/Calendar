import { useEffect, useMemo, useState } from "react";

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
      height: "25rem",
      top: "15rem",
      margin: "0 auto",
    };

    const style = {
      height: "25rem",
      top: "15rem",
      left: "29.2%",
    };

    if (mode) {
      if (windowWidth <= 1000) {
        return { type: "mobile", style: { width: "80%", ...mobileStyle } };
      } else return { type: "web", style: { width: "20%", ...style } };
    } else {
      return { style: { width: "50%", height: "40rem" } };
    }
  }, [mode, windowWidth]);

  return getWidth;
};
