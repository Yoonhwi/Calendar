import { useEffect, useState } from "react";
import { TodoDataProps } from "..";
import Styles from "./index.module.scss";
import { getFetch, useGetWithParams, useUpdateTodoList } from "@/api/apis";
import { ApiRoutes } from "@/constants/routes";

interface ShowTodoListProps {
  todoData: TodoDataProps[] | undefined;
  deleteMutate: (id: number) => void;
  setTodoData: React.Dispatch<
    React.SetStateAction<TodoDataProps[] | undefined>
  >;
  dataForFetch: Object;
}

interface ModifyArrayProps {
  // 여러개의 수정을 관리해야함으로 배열로 관리합니다.
  id: number;
  text: string;
}

export const ShowTodoList = ({
  todoData,
  deleteMutate,
  setTodoData,
  dataForFetch,
}: ShowTodoListProps) => {
  const [modify, setModify] = useState<ModifyArrayProps[]>([]);

  const { mutate, isSuccess } = useUpdateTodoList();
  const { refetch } = useGetWithParams(
    //page별 데이터가져오기
    ApiRoutes.Todo,
    () =>
      getFetch({
        url: ApiRoutes.Todo,
        params: dataForFetch,
      }),
    dataForFetch
  );

  const onClickSuccessHandler = (id: number) => {
    mutate({ id, text: modify.find((item) => item.id === id)?.text! });
    setModify((prev) => prev.filter((v) => v.id !== id));
  };

  const isIdInModify = (id: number) => {
    return modify.some((item) => item.id === id);
  };

  useEffect(() => {
    if (!isSuccess) return;
    refetch().then((res) => setTodoData(res.data));
  }, [isSuccess, refetch, setTodoData]);

  return (
    <div className={Styles.list_container}>
      {todoData && todoData.length > 0 ? (
        todoData.map((v) => {
          return (
            <div className={Styles.list_item} key={`todoList_${v.id}`}>
              {isIdInModify(v.id) ? (
                <input
                  value={modify.find((item) => item.id === v.id)?.text}
                  className={Styles.list_content}
                  //여러개를 동시에 수정할 수 있기때문에, id와 text를 이용해 해당 id만 text를 수정합니다.
                  onChange={(e) =>
                    setModify((prev) =>
                      prev.map((item) =>
                        item.id === v.id
                          ? { ...item, text: e.target.value }
                          : item
                      )
                    )
                  }
                />
              ) : (
                <div className={Styles.list_content}>{v.text}</div>
              )}
              {isIdInModify(v.id) ? (
                <button onClick={() => onClickSuccessHandler(v.id)}>🖍️</button>
              ) : (
                <button
                  onClick={() =>
                    setModify((prev) => [...prev, { id: v.id, text: v.text }])
                  }
                >
                  ✏️
                </button>
              )}
              <button onClick={() => deleteMutate(v.id)}>🗑️</button>
              <input type="checkbox" />
            </div>
          );
        })
      ) : (
        <div>데이터없음</div>
      )}
    </div>
  );
};
