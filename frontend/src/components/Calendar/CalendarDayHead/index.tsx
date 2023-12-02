import Styles from "./index.module.css";
import { DAYS } from "@/constants/day";

export const CalendarDayHead = () => {
  return (
    <div className={Styles.dayhead_container}>
      {DAYS.map((v, i) => (
        <div key={`DAY_${v}${i}`} className={Styles.day}>
          {v}
        </div>
      ))}
    </div>
  );
};
