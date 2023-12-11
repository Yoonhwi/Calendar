import { useEffect, useRef, useState } from "react";
import { CalendarController } from "./CalendarController";
import { CalendarDate } from "./CalendarDate";
import Styles from "./index.module.scss";
import { CalendarDayHead } from "./CalendarDayHead";
import { useGetWidth } from "@/hooks/useGetWidth";
import TodoList from "../TodoList";

const { CSSTransition } = require("react-transition-group");

export const Calendar = () => {
  const [nowDate, setNowDate] = useState<Date>(new Date()); //현재날짜
  const [onDate, setOnDate] = useState<Date>(); // 클릭날짜

  const [mode, setMode] = useState(false);
  const [isShowTodo, setIsShowTodo] = useState(false);

  const containerStyle = useGetWidth(mode);

  useEffect(() => {
    if (onDate) {
      setMode(true);
    }
  }, [onDate]);

  useEffect(() => {
    if (containerStyle.type) {
      setIsShowTodo(true);
    }
  }, [containerStyle.type]);

  return (
    <div>
      <section
        className={Styles.calendar_container}
        style={containerStyle.style}
      >
        <CalendarController
          date={nowDate}
          setDate={setNowDate}
          setMode={setMode}
          setOnDate={setOnDate}
          mode={mode}
        />
        <div className={Styles.date_container}>
          <CalendarDayHead />
          <CalendarDate date={nowDate} clicked={onDate} set={setOnDate} />
        </div>
      </section>
      {containerStyle.type ? (
        <CSSTransition
          in={isShowTodo}
          timeout={300}
          classNames={{
            enter: Styles.transition_enter,
            enterActive: Styles.transition_enter_active,
          }}
          unmountOnExit
        >
          <TodoList
            style={
              containerStyle.type === "web"
                ? {
                    position: "absolute",
                    top: "7.5rem",
                    left: "41%",
                    width: "40%",
                  }
                : "mobile"
                ? {
                    position: "absolute",
                    top: "30rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: `${containerStyle.style.width}`,
                  }
                : {}
            }
            clickedDate={onDate?.toLocaleDateString("en-US", {
              year: "numeric",
              month: "numeric",
              day: "numeric",
            })}
          />
        </CSSTransition>
      ) : null}
    </div>
  );
};
