import { Login } from "@/components/Login";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <title>Calendar & Todo List</title>
        <meta
          name="description"
          content="This is a calendar and todo list login page."
        />
      </Head>
      <Login />
    </>
  );
}
