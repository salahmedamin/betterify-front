import { useColors } from "../../../../../colors";

export const Image = ({ image, onClick, selected }) => {
  const colors = useColors();
  return (
    <div
      onClick={onClick}
      style={{
        minWidth: 60,
        height: 60,
        margin: 10,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(http://localhost:5000/api/media/${image})`,
        cursor: "pointer",
        borderRadius: 5,
        border: `${selected ? "4" : "1"}px solid ${
          selected ? colors.whiteBlue : colors.gray
        }`,
      }}
    />
  );
};
