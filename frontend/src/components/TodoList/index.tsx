import { ApiRoutes } from "@/constants/routes";
import { Divier } from "../Divider";
import { Pagination } from "../Pagination";
import Styles from "./index.module.scss";
import React, { useEffect, useState } from "react";
import { getFetch, useGet, usePost } from "@/api/apis";

interface TodoListProps {
  style: React.CSSProperties;
  clickedDate: string | undefined;
}

interface ApiResponse {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

interface TodoDataProps {
  id: number;
  text: string;
  isDone: boolean;
  date: string;
  writer: number;
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
  const [inputTodoList, setInputTodoList] = useState(""); //입력받을 todolist
  const [userData, setUserData] = useState({ email: "", id: 0 }); //필요한 유저정보를 저장
  const [todoData, setTodoData] = useState<TodoDataProps[]>(); //해당 유저와 날짜에맞는 todolist

  const { mutate, isSuccess } = usePost(ApiRoutes.Todo, {
    //post요청
    writer: userData.id,
    text: inputTodoList,
    date: clickedDate,
  });

  const { data } = useGet(
    //accessToken을 디코딩하여 user정보를 가져옵니다.
    ApiRoutes.Token,
    () => getFetch({ url: ApiRoutes.Token }),
    { enabled: true }
  );

  useEffect(() => {
    // user정보를 가져와 필요한 정보를 userData에 저장합니다.
    if (!data) return;
    const dataExtendId = data?.data as ApiResponse;
    setUserData({ email: dataExtendId.email, id: dataExtendId.id });
  }, [data]);

  useEffect(() => {
    //post 가 성공하여 isSuccess가 true가 된다면 inputList를 초기화합니다.
    if (!isSuccess) return;
    setInputTodoList("");
  }, [isSuccess]);

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
            value={inputTodoList}
          />
        </div>
        <button onClick={mutate}>✔</button>
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
