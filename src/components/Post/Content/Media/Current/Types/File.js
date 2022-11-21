// import { useEffect, useState } from "react";

import axios from "axios";
import { useColors } from "../../../../../../colors";

export const File = ({
  unique,
  name,
  size,
  isWhite = false,
  style,
  parentStyle,
}) => {
  const finalSize = {
    kb: size / 1024,
    mb: size / 1024 / 1024,
    gb: size / 1024 / 1024 / 1024,
  };
  const colors = useColors();
  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        ...parentStyle,
      }}
    >
      <div
        style={{
          width: "40%",
          height: "60%",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/images/post/content/file${
            isWhite ? "_white" : ""
          }.svg)`,
          ...style,
        }}
      />
      <div style={{ color: colors.white }}>
        <span
          style={{
            maxWidth: 100,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name
            ?.split(".")
            .filter((a, i) => i < name?.split(".").length - 1)
            .join(".")}
        </span>
        .{name?.split(".")[name?.split(".").length - 1]} -{" "}
        {finalSize.gb > 1
          ? finalSize.gb.toFixed(2) + "GB"
          : finalSize.mb > 1
          ? finalSize.mb.toFixed(2) + "MB"
          : finalSize.kb > 1
          ? finalSize.kb.toFixed(2) + "KB"
          : size}{" "}
        -{" "}
        <b
          style={{ cursor: "pointer" }}
          onClick={async () =>
            await axios.post(process.env.REACT_APP_API + "download/" + unique)
          }
        >
          Download
        </b>
      </div>
    </div>
  );
};
