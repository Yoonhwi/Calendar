import { ApiRoutes } from "@/constants/routes";
import { Divier } from "../Divider";
import { Pagination } from "../Pagination";
import Styles from "./index.module.scss";
import React, { useEffect, useMemo, useState } from "react";
import {
  getFetch,
  useDeleteTodoList,
  useGet,
  useGetWithParams,
  usePost,
} from "@/api/apis";
import { getCountAndList } from "@/api/getCountAndList";
import { ShowTodoList } from "./ShowTodoList";

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

export interface TodoDataProps {
  id: number;
  text: string;
  isDone: boolean;
  date: string;
  writer: number;
}

const TodoList = ({ style, clickedDate }: TodoListProps) => {
  const [inputTodoList, setInputTodoList] = useState(""); //입력받을 todolist
  const [userData, setUserData] = useState({ email: "", id: 0 }); //필요한 유저정보를 저장
  const [todoData, setTodoData] = useState<TodoDataProps[]>(); //해당 유저와 날짜에맞는 todolist

  const [page, setPage] = useState(1);

  const { mutate: deleteMutate, isSuccess: deleteSuccess } =
    useDeleteTodoList();

  const { mutate: postMutate, isSuccess: postSuccess } = usePost(
    ApiRoutes.Todo,
    {
      //post요청
      writer: userData.id,
      text: inputTodoList,
      date: clickedDate,
    }
  );

  const { data, isSuccess: getTokenSuccess } = useGet(
    //accessToken을 디코딩하여 user정보를 가져옵니다.
    ApiRoutes.Token,
    () => getFetch({ url: ApiRoutes.Token })
  );

  const { refetch: getTodoList } = useGetWithParams(
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
    if (!getTokenSuccess) return;
    console.log(data);
    // user정보를 가져와 필요한 정보를 userData에 저장합니다.
    // 유저정보가있다면 , 해당날짜에 맞는 todolist를 가져옵니다.
    const dataExtendId = data?.data as ApiResponse;
    //post요청시 필요한 정보를 userData에 저장합니다.
    setUserData({ email: dataExtendId.email, id: dataExtendId.id });
  }, [data, refetchCount, getTokenSuccess]);

  useEffect(() => {
    //post 가 성공하여 isSuccess가 true가 된다면 inputList를 초기화합니다.
    if (!postSuccess) return;
    setInputTodoList("");
    getCountAndList(getTodoList, refetchCount, setTodoData);
    console.log(todoData);
  }, [postSuccess, getTodoList, refetchCount, todoData]);

  useEffect(() => {
    //delete가 성공하여 deleteSuccess가 true가 된다면 todolist를 다시 가져옵니다.
    if (!deleteSuccess) return;
    getCountAndList(getTodoList, refetchCount, setTodoData);
  }, [deleteSuccess, getTodoList, refetchCount]);

  useEffect(() => {
    console.log(page);
    if (!userData.id) return;
    getCountAndList(getTodoList, refetchCount, setTodoData);
  }, [getTodoList, page, userData.id, clickedDate, refetchCount, data]);

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
        <button onClick={postMutate}>✔</button>
      </div>
      <Divier style={{ color: "#fff", width: "95%", height: "2rem" }} />
      <ShowTodoList
        todoData={todoData}
        deleteMutate={deleteMutate}
        setTodoData={setTodoData}
        dataForFetch={{ page, writer: userData.id, date: clickedDate }}
      />
      <div className={Styles.pagination}>
        {count ? (
          <Pagination
            total={count}
            setPage={setPage}
            currentPage={page}
            clicked={clickedDate}
          />
        ) : null}
      </div>
    </section>
  );
};

export default React.memo(TodoList);
