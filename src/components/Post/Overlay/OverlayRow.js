import React from "react";
import { useColors } from "../../../colors";
import { useHover } from "../../../hooks/useHover";

export default function OverlayRow({
  img: { img_active, img_inactive, img_default, img_style } = {},
  color: { color_active, color_inactive, color_default } = {},
  isActive,
  text: { text_active, text_inactive, text_default } = {},
  fn: { fn_active, fn_inactive, fn_default } = {},
  style,
  onHoverBg,
  className,
  ...props
}) {
  const [ref, isHovered] = useHover();
  const colors = useColors();
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        background: isHovered
          ? onHoverBg || colors.coolors.charocal + "80"
          : "transparent",
        transition: ".3s ease all",
        padding: 10,
        paddingLeft: 25,
        borderRadius: 5,
        cursor: "pointer",
        ...style,
      }}
      onClick={() =>
        fn_default ? fn_default() : isActive ? fn_active() : fn_inactive()
      }
      className={className}
      {...props}
    >
      <div
        style={{
          backgroundImage: `url(${
            img_default ?? (isActive ? img_active : img_inactive)
          })`,
          backgroundSize: "25px 25px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          width: 35,
          height: 35,
          marginRight: 20,
          ...img_style,
        }}
      />
      <div
        style={{
          color: color_default ?? (isActive ? color_active : color_inactive),
          fontWeight: "bold",
        }}
      >
        {text_default ?? (isActive ? text_active : text_inactive)}
      </div>
    </div>
  );
}
