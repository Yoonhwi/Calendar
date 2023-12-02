import Styles from "./index.module.scss";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <div className={Styles.container}>{children}</div>;
};

export default DefaultLayout;
