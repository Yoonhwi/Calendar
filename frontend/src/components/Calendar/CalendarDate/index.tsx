import { useMemo, useState } from "react";
import Styles from "./index.module.css";
import { addDays } from "@/utilities/addDays";

interface CalendarDateProp {
  date: Date;
}

export const CalendarDate = ({ date }: CalendarDateProp) => {
  const [day, setDay] = useState<Array<number | null>>([]);
  console.log("calendar date:", date);

  const nowYear = date.getFullYear();
  const nowMonth = date.getMonth();

  const dayFirstWeek = new Date(nowYear, nowMonth, 1).getDay(); //월의 첫번째날의 요일

  const lastDayOfCurrentMonth = new Date(nowYear, nowMonth + 1, 0); //총일수를 위해 다음달의 첫째 날의 전날을 구함.
  const totalDays = lastDayOfCurrentMonth.getDate(); //총일수

  useMemo(() => {
    const result = addDays({
      days: totalDays,
      firstDay: dayFirstWeek,
      arr: [],
    });
    setDay(result);
  }, [dayFirstWeek, totalDays]);

  return (
    <div className={Styles.date_container}>
      {day.map((v, i) => {
        if (!!v) {
          return (
            <div key={`day_${i}`} className={Styles.date}>
              {v}
            </div>
          );
        } else {
          return <div key={`day_${i}`} className={Styles.none_date} />;
        }
      })}
    </div>
  );
};
