import { ApiRoutes } from "@/constants/routes";
import Styles from "./index.module.scss";
import { getFetch, useGet } from "@/api/apis";
import { useEffect } from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { data } = useGet(
    ApiRoutes.Token,
    () => getFetch({ url: ApiRoutes.Token }),
    {
      enabled: true,
    }
  );
  useEffect(() => {
    if (!data) return;
    if (!!data.data) {
      console.log("DefaultLayout", data.data);
    }
  }, [data]);

  return <div className={Styles.container}>{children}</div>;
};

export default DefaultLayout;
