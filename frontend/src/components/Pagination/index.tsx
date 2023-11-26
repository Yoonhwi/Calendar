import Styles from "./index.module.css";

export const Pagination = () => {
  const length = 2;
  const arr = [];

  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }

  return (
    <div>
      {length > 1 ? (
        <div className={Styles.page_container}>
          <span>{"<"}</span>
          {arr.map((v) => {
            return <span key={v}>{v}</span>;
          })}
          <span>{">"}</span>
        </div>
      ) : null}
    </div>
  );
};
