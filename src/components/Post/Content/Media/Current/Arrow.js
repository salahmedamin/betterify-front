export const Arrow = ({ left, onClick }) => {
  return (
    <div
      style={{
        position: "absolute",
        minWidth: 35.5,
        minHeight: 38,
        backdropFilter: "blur(25px) brightness(100%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        left: left ? "5%":undefined,
        right: !left ? "5%":undefined,
        cursor:"pointer",
        zIndex: 10
      }}
      onClick={onClick}
    >
      <img
        src="/images/post/content/arrow.svg"
        alt="Arrow"
        width="35"
        height="20"
        style={{
            transform: !left ? "rotate(180deg)" : undefined
        }}
      />
    </div>
  )
}
