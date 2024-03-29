import React from "react";
import { useColors } from "../../colors";

export default function Tooltip({
  top,
  right,
  left,
  bottom,
  showCondition,
  text,
  children,
  style,
}) {
  const colors = useColors();
  return (
    <div
      key={1}
      style={{
        left: right ? `calc( 100% + ${right} )` : undefined,
        right: left ? `calc( 100% + ${left} )` : undefined,
        top: bottom ? `calc( 100% + ${bottom} )` : undefined,
        bottom: top ? `calc( 100% + ${top} )` : undefined,
        position: "absolute",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
        transition: ".25s ease all",
        borderRadius: 5,
        fontSize: 13,
        visibility: showCondition ? "visible" : "hidden",
        opacity: showCondition ? 1 : 0,
        border: `1px solid ${colors.gray}`,
        ...style,
      }}
    >
      {text || children}
    </div>
  );
}
