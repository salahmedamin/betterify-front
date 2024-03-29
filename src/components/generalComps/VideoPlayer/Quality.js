import { useRef } from "react";
import { useColors } from "../../../colors";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

export default function Quality({
  current,
  setcurrent,
  list,
  showQualities,
  setshowQualities,
}) {
  const ref = useRef();

  useOnClickOutside(ref, () => setshowQualities(false));
  const colors = useColors();

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "100%",
        width: 20,
        marginLeft: 10,
      }}
    >
      <div
        style={{
          backgroundSize: "20px 20px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/images/post/content/hq.svg)`,
          height: "100%",
          width: 20,
          cursor: "pointer",
        }}
        onClick={() => setshowQualities(!showQualities)}
      />
      <div
        style={{
          transform: `translateX(-50%)`,
          position: "absolute",
          bottom: "100%",
          transition: ".3s ease all",
          visibility: showQualities ? "visible" : "hidden",
          borderTopRightRadius: 3,
          borderTopLeftRadius: 3,
          opacity: showQualities ? 1 : 0,
          left: "50%",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {list?.map((a, i) => (
          <div
            key={i}
            onClick={() => {
              setshowQualities(false);
              setcurrent(list.findIndex((e) => e.quality === a.quality));
            }}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              fontSize: 13,
              color: "#ffffff",
              margin: 3,
              background:
                list[current].quality === a.quality
                  ? colors.blue + "80"
                  : i % 2 === 0
                  ? "#ffffff30"
                  : "#17191b",
            }}
          >
            {a.quality}
          </div>
        ))}
      </div>
    </div>
  );
}
