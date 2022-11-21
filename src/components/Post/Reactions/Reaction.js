// PATH IS /images/post/reaction

import React from "react";
import { react } from "../../../async/posts/react";
import { useColors } from "../../../colors";
import { setShowReactions } from "../../../dispatches/posts/setShowReactions";
import { useHover } from "../../../hooks/useHover";

function Reaction({ isSelected, name, id }) {
  const colors = useColors();
  const [ref, hovered] = useHover();
  return (
    <div
      ref={ref}
      onClick={async () => {
        setShowReactions({
          id,
          value: false,
        });
        await react({
          emoji: name.toLowerCase(),
          postID: id,
        });
      }}
      style={{
        boxSizing: "content-box",
        padding: 10,
        background: isSelected
          ? colors.white + "80"
          : hovered
          ? colors.white + "20"
          : undefined,
        transition: ".3s ease all",
        borderRadius: 6,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: colors.white,
        fontSize: 14,
      }}
    >
      <img
        src={`/images/post/reaction/${name.toLowerCase()}.svg`}
        width={45}
        height={45}
        style={{
          objectFit: "contain",
          marginBottom: 10,
        }}
        alt="Reaction"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default Reaction;
