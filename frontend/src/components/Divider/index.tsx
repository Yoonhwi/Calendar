interface DividerProp {
  style: React.CSSProperties;
}
export const Divier = ({ style }: DividerProp) => {
  return (
    <div
      style={{
        borderBottom: `3px solid ${style.color}`,
        width: `${style.width}`,
        margin: "0 auto",
        height: `${style.height}`,
      }}
    />
  );
};
