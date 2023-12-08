import Styles from "./index.module.css";
import { useState } from "react";

interface PaginationProps {
  count: any;
  set: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({ count, set }: PaginationProps) => {
  let pageNum = 0;
  //총 카운트가 오는거라 page별로 나눠줘야함
  count / 6 < 1 ? (pageNum = 1) : (pageNum = Math.ceil(count / 6));

  let pageArr = [];
  for (let i = 1; i <= pageNum; i++) {
    pageArr.push(i);
  }
  return (
    <div className={Styles.page_container}>
      <span>{"<"}</span>
      {pageArr.map((v) => {
        return (
          <span key={v} onClick={() => set(v)}>
            {v}
          </span>
        );
      })}
      <span>{">"}</span>
    </div>
  );
};
