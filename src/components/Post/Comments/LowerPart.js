import React, { useEffect, useState } from "react";
import { useColors } from "../../../colors";
import Snippet from "../../generalComps/Snippet";
import { reactionsBg } from "../Reactions/reactions_list";
import { generateRandomReactionIcon } from "./LowerPart/generateReactionIcon";
export const LowerPart = React.forwardRef(
  ({ isEdited, currentReact, canReply, onReply, beingRepliedTo }, _ref) => {
    const react = reactionsBg.find(
      (e) => e.name.toLowerCase() === currentReact[0]?.emoji?.toLowerCase()
    );
    const [random, setrandom] = useState(generateRandomReactionIcon());
    useEffect(() => {
      setrandom(generateRandomReactionIcon());
    }, []);
    const colors = useColors();
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: 3,
              background: react?.bg || "",
              border: `1px solid ${react?.bg || "transparent"}`,
            }}
            className="py-0 px-1"
          >
            <div>
              <img
                src={`/images/post/reaction/${
                  currentReact?.length > 0
                    ? currentReact[0]?.emoji?.toLowerCase()
                    : random?.name?.toLowerCase()
                }.svg`}
                width={15}
                height={15}
                style={{
                  objectFit: "contain",
                  marginRight: 5,
                }}
                alt="Reaction"
              />
            </div>
            <b
              style={{
                color: react?.color || colors.white,
                lineHeight: 2.25,
                fontSize: 11,
              }}
            >
              {currentReact?.length > 0 ? react?.name : "React"}
            </b>
          </div>
          {canReply ? (
            <div
              style={{
                color: colors.white,
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                marginLeft: 15,
                cursor: "pointer",
                border: `1px solid ${
                  beingRepliedTo ? colors.white : "transparent"
                }`,
                fontWeight: "bold",
                transition: ".3s ease all",
                borderRadius: 3,
              }}
              className={`p-1`}
              onClick={() => {
                onReply();
                if (!beingRepliedTo) {
                  _ref?.current?.focus();
                } else _ref?.current?.blur();
              }}
            >
              {beingRepliedTo ? "Cancel" : "Reply"}
            </div>
          ) : null}
        </div>

        {isEdited ? (
          <Snippet
            key={3}
            style={{
              fontSize: 11,
              borderBottom: "1px solid " + colors.gray,
              borderRadius: 0,
            }}
            cb={() => undefined}
            color={"#ffffff"}
            text="Edited"
            image={{
              path: "/images/post/content/edit.svg",
              width: 12,
              height: 12,
            }}
          />
        ) : null}
      </div>
    );
  }
);
