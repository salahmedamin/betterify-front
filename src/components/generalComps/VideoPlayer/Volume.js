import React, { useRef, useState } from "react";
import { useColors } from "../../../colors";

export default function Volume({ volume, setvolume }) {
  const volBarRef = useRef();
  const calcVol = (e) => {
    const { y, height } = volBarRef.current.getBoundingClientRect();
    const vol = e.clientY - y;
    const percentage = (vol * 100) / height;
    setvolume(Math.abs(percentage - 100));
  };
  const [showVolBar, setshowVolBar] = useState(false);
  const colors = useColors();
  return (
    <div
      style={{ position: "relative", height: "100%", width: 20 }}
      onMouseOver={() => setshowVolBar(true)}
      onMouseOut={() => setshowVolBar(false)}
    >
      <div
        style={{
          height: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          bottom: "100%",
          justifyContent: "center",
          visibility: showVolBar ? "visible" : "hidden",
          opacity: showVolBar ? 1 : 0,
          position: "absolute",
          overflow: "hidden",
          transition: ".3s ease all",
        }}
      >
        <div
          ref={volBarRef}
          style={{
            height: "100%",
            width: 10,
            // border: "1px solid "+colors.white,
            // background: colors.gray+"60",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
            position: "relative",
          }}
          onClick={calcVol}
        >
          <div
            style={{
              height: "100%",
              width: 2,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#ffffff",
            }}
          />
          <div
            style={{
              height: volume,
              width: "50%",
              background: "#ffffff",
              borderRadius: 5,
            }}
          />
        </div>
      </div>

      <div
        style={{
          backgroundSize: "20px 20px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/images/post/content/${
            volume === 0 ? "mute" : "sound"
          }.svg)`,
          height: "100%",
          width: 20,
          cursor: "pointer",
        }}
        onClick={() => setvolume(volume === 0 ? 50 : 0)}
      />
    </div>
  );
}
