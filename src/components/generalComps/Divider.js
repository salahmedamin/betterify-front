import React from "react";
import { useColors } from "../../colors";

export default function Divider({ color, showCondition, width, height }) {
  const colors = useColors();
  return (
    <div
      style={{
        width,
        height,
        borderTop: width ? "1px solid " + (color || colors.gray) : undefined,
        borderLeft: height ? "1px solid " + (color || colors.gray) : undefined,
        transition: ".3s ease all",
        visibility: showCondition ? "hidden" : "visible",
        opacity: showCondition ? 0 : 1,
      }}
    />
  );
}
