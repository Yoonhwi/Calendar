import Head from "next/head";
import Styles from "./index.module.css";
import { Calendar } from "@/components/Calendar";

const TodoPage = () => {
  return (
    <div className={Styles.todo_container}>
      <Head>
        <title>Calendar & Todo List</title>
        <meta
          name="description"
          content="This is a calendar and todo list application."
        />
      </Head>
      <Calendar />
    </div>
  );
};
export default TodoPage;
