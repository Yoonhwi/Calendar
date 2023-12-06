import { ApiRoutes } from "@/constants/routes";
import { Divier } from "../Divider";
import { Pagination } from "../Pagination";
import Styles from "./index.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { getFetch, useGet } from "@/api/apis";
import { UseQueryResult } from "@tanstack/react-query";

interface TodoListProps {
  style: React.CSSProperties;
  clickedDate: Date | undefined;
}

interface ApiResponse {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

const DATA = [
  {
    id: 1,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
  {
    id: 2,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
  {
    id: 3,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
  {
    id: 4,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
  {
    id: 5,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
  {
    id: 6,
    content: "content",
    date: "11/16/2023",
    writer: 1,
  },
];

const TodoList = ({ style, clickedDate }: TodoListProps) => {
  const [inputTodoList, setInputTodoList] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    id: 0,
  });

  const { data } = useGet({
    //user 정보
    url: ApiRoutes.Token,
    fn: () => getFetch({ url: ApiRoutes.Token }),
    options: { enabled: true },
  });

  useEffect(() => {
    if (!data) return;
    const dataExtendId = data?.data as ApiResponse;
    setUserData({ email: dataExtendId.email, id: dataExtendId.id });
  }, [data]);
  //writer = userData.id , text = inputTodoList, date = clickedDate
  const numericDate = clickedDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  console.log(numericDate);

  return (
    <section style={style} className={Styles.todolist_container}>
      <div className={Styles.todo_header}>Enter your daily schedule!</div>
      <div className={Styles.input_container}>
        <div className={Styles.input_wrapper}>
          <input
            placeholder="What is your to-do?"
            className={Styles.input_field}
            maxLength={20}
            onChange={(e) => setInputTodoList(e.target.value)}
          />
        </div>
        <button onClick={() => console.log(inputTodoList)}>✔</button>
      </div>
      <Divier style={{ color: "#fff", width: "95%", height: "2rem" }} />
      <div className={Styles.list_container}>
        {DATA.map((v) => {
          return (
            <div className={Styles.list_item} key={`todoList_${v.id}`}>
              <div className={Styles.list_content}>content</div>
              <button>✏️</button>
              <button>🗑️</button>
              <input type="checkbox" checked={true} />
            </div>
          );
        })}
        <Pagination />
      </div>
    </section>
  );
};

export default React.memo(TodoList);
