export const NoData = () => {
  return (
    <div
      style={{
        fontSize: "1.2rem",
        color: "#fff",
        fontWeight: "bold",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>List does not exist 😢</div>
      <div>Enter your todolist!</div>
    </div>
  );
};
