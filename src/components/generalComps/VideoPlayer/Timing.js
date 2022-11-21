import React from "react";

export default function Timing({ timing, duration }) {
  return (
    <div
      style={{
        color: "#ffffff",
        fontSize: 10,
        marginLeft: 5,
        cursor: "default",
        display: "flex",
        position: "absolute",
        top: window.innerWidth < 690 ? 20 : 10,
        left: 10,
        paddingLeft: 5,
        backdropFilter: "blur(3px) brightness(150%)",
      }}
    >
      {timing.hours > 0 ? timing.hours + ":" : null}
      {timing.minutes + ":" + timing.seconds}/
      {duration.hours > 0 ? duration.hours + ":" : null}
      {duration.minutes + ":" + duration.seconds}
    </div>
  );
}
