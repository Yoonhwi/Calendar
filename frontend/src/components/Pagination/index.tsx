import Styles from "./index.module.css";
import { useEffect, useState } from "react";

interface PaginationProps {
  total: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  clicked: string | undefined;
}

const LIMIT = 6; // 페이지당 리스트 갯수
const CUTPAGE = 5; // 페이지를 끊을 갯수

export const Pagination = ({
  total,
  setPage,
  currentPage,
  clicked,
}: PaginationProps) => {
  const [btnPage, setBtnPage] = useState(1); // 페이지를 5개씩 끊어서 보여줄때 사용 ex) 1,2,3,4,5 페이지에서 > 버튼클릭시 6,7,8,9,10페이지로변경
  const [slicePage, setSlicePage] = useState(0);

  let pageCount = 0;

  //총 카운트가 오는거라 page별로 나눠줘야함
  total / 6 < 1 ? (pageCount = 1) : (pageCount = Math.ceil(total / LIMIT));

  let pageArr = [];
  for (let i = 1; i <= pageCount; i++) {
    pageArr.push(i);
  }

  const onClickPrevHandler = () => {
    setSlicePage((prev) => prev - CUTPAGE);
    setBtnPage((prev) => prev - 1);
    setPage(slicePage - CUTPAGE + 5);
  };

  const onClickNextHandler = () => {
    setSlicePage((prev) => prev + CUTPAGE);
    setBtnPage((prev) => prev + 1);
    setPage(slicePage + CUTPAGE + 1);
  };

  useEffect(() => {
    setSlicePage(0);
    setBtnPage(1);
    setPage(1);
  }, [clicked, setPage]);

  useEffect(() => {
    console.log(
      "currentPage",
      currentPage,
      "slicePage",
      slicePage,
      "btnPage",
      btnPage
    );
  }, [btnPage, currentPage, slicePage, clicked]);
  return (
    <div className={Styles.page_container}>
      <span
        className={btnPage === 1 ? Styles.none_btn : ""}
        onClick={() => onClickPrevHandler()}
      >
        {"<"}
      </span>
      {pageArr.slice(slicePage, slicePage + CUTPAGE).map((v) => {
        return (
          <span
            key={v}
            onClick={() => setPage(v)}
            className={v === currentPage ? Styles.active_btn : ""}
          >
            {v}
          </span>
        );
      })}
      <span
        className={pageArr.length / CUTPAGE <= btnPage ? Styles.none_btn : ""}
        onClick={() => onClickNextHandler()}
      >
        {">"}
      </span>
    </div>
  );
};
