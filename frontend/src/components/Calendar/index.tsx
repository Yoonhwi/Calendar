import { useState } from "react";
import { CalendarController } from "./CalendarController";
import { CalendarDate } from "./CalendarDate";
import Styles from "./index.module.css";
import { CalendarDayHead } from "./CalendarDayHead";

export const Calendar = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [onDate, setOnDate] = useState<Date>();

  return (
    <div className={Styles.calendar_container}>
      <CalendarController date={nowDate} setDate={setNowDate} />
      <div className={Styles.date_container}>
        <CalendarDayHead />
        <CalendarDate date={nowDate} clicked={onDate} set={setOnDate} />
      </div>
    </div>
  );
};
