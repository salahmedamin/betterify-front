import React from "react";
import { useColors } from "../../../colors";
import { Loading } from "../../../Loading";

export default function SwitchPlay({ playing, pause, play, loading }) {
  const colors = useColors();
  return loading ? (
    <Loading
      style={{
        width: 30,
        height: "100%",
        cursor: "pointer",
      }}
      spinnerStyle={{
        width: 25,
        height: 25,
      }}
      spinnerColor={colors.white}
    />
  ) : (
    <div
      style={{
        width: 30,
        height: "100%",
        backgroundSize: !playing ? "25px 25px" : "25px 15px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundImage:
          "url(/images/post/content/" +
          (!playing ? "play" : "pause") +
          "_video.svg)",
        cursor: "pointer",
      }}
      onClick={() => (playing ? pause() : play())}
    />
  );
}
