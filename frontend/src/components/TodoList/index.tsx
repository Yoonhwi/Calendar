import { Divier } from "../Divider";
import { Pagination } from "../Pagination";
import Styles from "./index.module.scss";

interface TodoListProps {
  style: React.CSSProperties;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  setOnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setIsShowTodo: React.Dispatch<React.SetStateAction<boolean>>;
  clickedDate: Date | undefined;
}
export const TodoList = ({
  style,
  setMode,
  setNowDate,
  setOnDate,
  setIsShowTodo,
  clickedDate,
}: TodoListProps) => {
  const numericDate = clickedDate?.toLocaleDateString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  console.log(numericDate);
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
  return (
    <section style={style} className={Styles.todolist_container}>
      <div className={Styles.todo_header}>Enter your daily schedule!</div>
      <div className={Styles.input_container}>
        <div className={Styles.input_wrapper}>
          <input
            placeholder="What is your to-do?"
            className={Styles.input_field}
            maxLength={20}
          />
        </div>
        <button>✔</button>
      </div>
      <Divier style={{ color: "#fff", width: "95%", height: "2rem" }} />
      <div className={Styles.list_container}>
        {DATA.map((v) => {
          return (
            <div className={Styles.list_item} key={`todoList_${v.id}`}>
              <div className={Styles.list_content}>content</div>
              <button>✏️</button>
              <button>🗑️</button>
            </div>
          );
        })}
        <Pagination />
      </div>
    </section>
  );
};
