import { ApiRoutes } from "@/constants/routes";
import { Divier } from "../Divider";
import { Pagination } from "../Pagination";
import Styles from "./index.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import { getFetch, useGet, useGetWithParams, usePost } from "@/api/apis";
import { getCountAndList } from "@/api/getCountAndList";

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
  const [page, setPage] = useState(1);

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

  const { refetch } = useGetWithParams(
    //page별 데이터가져오기
    ApiRoutes.Todo,
    () =>
      getFetch({
        url: ApiRoutes.Todo,
        params: { page, writer: userData.id, date: clickedDate },
      }),
    { page, writer: userData.id, date: clickedDate }
  );

  const { data: count, refetch: refetchCount } = useGet(ApiRoutes.Count, () =>
    getFetch({
      url: ApiRoutes.Count,
      params: { writer: userData.id, date: clickedDate },
    })
  );

  useEffect(() => {
    // user정보를 가져와 필요한 정보를 userData에 저장합니다.
    if (!data) return;
    // 유저정보가있다면 , 해당날짜에 맞는 todolist를 가져옵니다.
    const dataExtendId = data?.data as ApiResponse;
    //post요청시 필요한 정보를 userData에 저장합니다.
    setUserData({ email: dataExtendId.email, id: dataExtendId.id });
  }, [data, refetchCount]);

  useEffect(() => {
    //post 가 성공하여 isSuccess가 true가 된다면 inputList를 초기화합니다.
    if (!isSuccess) return;
    setInputTodoList("");
    getCountAndList(refetch, refetchCount, setTodoData);
  }, [isSuccess, refetch, refetchCount]);

  useEffect(() => {
    if (!userData.id) return;
    getCountAndList(refetch, refetchCount, setTodoData);
  }, [refetch, page, userData.id, clickedDate, refetchCount]);

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
        {todoData && todoData.length > 0 ? (
          todoData.map((v) => {
            return (
              <div className={Styles.list_item} key={`todoList_${v.id}`}>
                <div className={Styles.list_content}>{v.text}</div>
                <button>✏️</button>
                <button>🗑️</button>
                <input type="checkbox" checked={v.isDone} />
              </div>
            );
          })
        ) : (
          <div>데이터없음</div>
        )}
      </div>
      <div className={Styles.pagination}>
        {count ? <Pagination count={count} set={setPage} /> : null}
      </div>
    </section>
  );
};

export default React.memo(TodoList);
