import { useColors } from "../../../../../colors";

export const Audio = ({ onClick, duration, selected }) => {
  const colors = useColors();
  return (
    <div
      onClick={onClick}
      style={{
        minWidth: 60,
        height: 60,
        margin: 10,
        cursor: "pointer",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: `${selected ? "4" : "1"}px solid ${
          selected ? colors.whiteBlue : colors.gray
        }`,
      }}
    >
      <div
        style={{
          width: 40,
          height: 50,
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(/images/post/content/audio.svg)`,
          backgroundSize: `20px 25px`,
        }}
      />
      <div style={{ color: colors.white, fontSize: 12 }}>
        {Math.floor(duration / 60)}:{Math.floor(duration % 60)}
      </div>
    </div>
  );
};
