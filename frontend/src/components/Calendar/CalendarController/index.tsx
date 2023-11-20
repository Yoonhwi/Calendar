import { useEffect } from "react";
import Styles from "./index.module.scss";

interface CalendarControllerProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarController = ({
  date,
  setDate,
}: CalendarControllerProps) => {
  const monthHandler = (num: number) => {
    const getDate = new Date(date.getTime());
    getDate.setMonth(getDate.getMonth() + num);
    setDate(getDate);
  };

  return (
    <div className={Styles.controller_container}>
      <button onClick={() => monthHandler(-1)}>{"<"}</button>
      <div className={Styles.view_date}>
        <span>{date.getFullYear()}</span>
        <span>{date.getMonth() + 1}</span>
      </div>
      <button onClick={() => monthHandler(1)}>{">"}</button>
    </div>
  );
};
