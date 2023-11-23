import { useCallback, useEffect, useState } from "react";
import { CalendarController } from "./CalendarController";
import { CalendarDate } from "./CalendarDate";
import Styles from "./index.module.css";
import { CalendarDayHead } from "./CalendarDayHead";
import { useGetWidth } from "@/hooks/useGetWidth";

export const Calendar = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date());
  const [onDate, setOnDate] = useState<Date>();

  const [mode, setMode] = useState(false);

  const containerStyle = useGetWidth(mode);

  useEffect(() => {
    if (onDate) {
      setMode(true);
    }
  }, [onDate]);

  return (
    <>
      <div className={Styles.calendar_container} style={containerStyle}>
        <CalendarController date={nowDate} setDate={setNowDate} />
        <div className={Styles.date_container}>
          <CalendarDayHead />
          <CalendarDate date={nowDate} clicked={onDate} set={setOnDate} />
        </div>
      </div>
    </>
  );
};
