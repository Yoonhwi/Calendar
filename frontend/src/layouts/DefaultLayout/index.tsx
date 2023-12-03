import { ApiRoutes } from "@/constants/routes";
import Styles from "./index.module.scss";
import { getFetch, useGet } from "@/api/apis";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const { data } = useGet({
    url: ApiRoutes.Token,
    fn: () => getFetch({ url: ApiRoutes.Token }),
  });
  return <div className={Styles.container}>{children}</div>;
};

export default DefaultLayout;
