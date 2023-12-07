import { ApiRoutes } from "@/constants/routes";
import Styles from "./index.module.scss";
import { getFetch, useGet } from "@/api/apis";
import { useEffect } from "react";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { data } = useGet(ApiRoutes.Token, () =>
    getFetch({ url: ApiRoutes.Token })
  );
  useEffect(() => {
    if (!data) return;
    if (!!data.data) {
      console.log(data.data);
      //여기서 해당 토큰을 보내면서 유저정보를 받아옴.
    }
  }, [data]);

  return <div className={Styles.container}>{children}</div>;
};

export default DefaultLayout;
