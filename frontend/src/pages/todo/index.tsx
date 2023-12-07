import Head from "next/head";
import Styles from "./index.module.css";
import { Calendar } from "@/components/Calendar";
import DefaultLayout from "@/layouts/DefaultLayout";
import { getFetch, useGet } from "@/api/apis";
import { ApiRoutes } from "@/constants/routes";
import { useRouter } from "next/router";

const TodoPage = () => {
  const { refetch } = useGet(ApiRoutes.Logout, () =>
    getFetch({ url: ApiRoutes.Logout })
  );

  const router = useRouter();

  return (
    <div className={Styles.todo_container}>
      <Head>
        <title>Calendar & Todo List</title>
        <meta
          name="description"
          content="This is a calendar and todo list application."
        />
      </Head>
      <button
        className={Styles.logout_btn}
        onClick={() => refetch().then(() => router.push("/"))}
      >
        logout
      </button>
      <DefaultLayout>
        <Calendar />
      </DefaultLayout>
    </div>
  );
};
export default TodoPage;
