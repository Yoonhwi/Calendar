import Styles from "./index.module.css";

interface TodoListProps {
  style: React.CSSProperties;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setNowDate: React.Dispatch<React.SetStateAction<Date>>;
  setOnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setIsShowTodo: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TodoList = ({
  style,
  setMode,
  setNowDate,
  setOnDate,
  setIsShowTodo,
}: TodoListProps) => {
  return (
    <div style={style} className={Styles.todolist_container}>
      123
      <br />
      <button
        onClick={() => {
          setMode(false);
          setNowDate(new Date());
          setOnDate(undefined);
          setIsShowTodo(false);
        }}
      >
        123
      </button>
      <br />
      123
      <br />
      123
      <br />
      123
      <br />
      123
      <br />
      123
      <br />
    </div>
  );
};
