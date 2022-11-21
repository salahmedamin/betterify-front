import React, { Children, useState } from "react";
// import useLongPress from '../../hooks/useLongPress'
import Tooltip from "./Tooltip";
// import debounce from "lodash/debounce";

export default function Snippet({
  color,
  text,
  style,
  bgColor,
  cb,
  // useHook,
  // longPressCb,
  custom,
  image: { path, width, height, imgStyle } = {},
  tooltip: { value, left, right, bottom, top, tooltip_style } = {},
}) {
  const [hover, sethover] = useState(false);
  // const [execDeb, setexecDeb] = useState(false);
  // const deb = debounce(
  //   typeof longPressCb === "function" ? longPressCb : () => undefined,
  //   800
  // );
  const onMouseOver = () => {
    // setexecDeb(true);
    sethover(true);
    // if (useHook && execDeb) {
    //   deb();
    // }
  };
  const onMouseOut = () => {
    sethover(false);
    // setexecDeb(false);
  };
  return (
    <div
      onClick={() => {
        if (typeof cb === "function") {
          cb();
          // setexecDeb(false);
          // deb.cancel();
        }
      }}
      key={1}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      style={{
        background: bgColor,
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 8,
        paddingRight: 8,
        color,
        borderRadius: 3,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        ...style,
      }}
    >
      {value ? (
        <Tooltip
          key={2}
          bottom={bottom}
          top={top}
          left={left}
          right={right}
          style={tooltip_style}
          text={value}
          showCondition={hover}
        >
          {Children}
        </Tooltip>
      ) : null}
      {path && width && height ? (
        <div
          key={3}
          style={{
            width,
            height,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(${path})`,
            backgroundSize: "contain",
            display: "inline-block",
            marginRight: 10,
            ...imgStyle,
          }}
        />
      ) : null}
      {text} {custom}
    </div>
  );
}
