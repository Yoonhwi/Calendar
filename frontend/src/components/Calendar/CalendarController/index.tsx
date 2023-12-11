import Styles from "./index.module.scss";

interface CalendarControllerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  setOnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  mode: boolean;
}

export const CalendarController = ({
  date,
  setDate,
  setMode,
  mode,
  setOnDate,
}: CalendarControllerProps) => {
  const monthHandler = (num: number) => {
    const getDate = new Date(date.getTime());
    getDate.setMonth(getDate.getMonth() + num);
    setDate(getDate);
  };

  return (
    <div className={Styles.controller_container}>
      <button onClick={() => monthHandler(-1)} className={Styles.arrow_btn}>
        {"<"}
      </button>
      <div className={Styles.view_date}>
        <span>{date.getFullYear()}</span>
        <span>{date.getMonth() + 1}</span>
      </div>
      <button onClick={() => monthHandler(1)} className={Styles.arrow_btn}>
        {">"}
      </button>
      <button
        onClick={() => {
          setMode(false);
          setOnDate(undefined);
        }}
        style={mode ? { fontSize: "1rem" } : { display: "none" }}
        className={Styles.extend_btn}
      >
        🔍
      </button>
    </div>
  );
};
