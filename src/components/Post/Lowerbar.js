import React from "react";
import { colors } from "../../colors";
import Snippet from "../generalComps/Snippet";
import { reactionsBg } from "./Reactions/reactions_list";

const sortByTwoProperties = ({ arr, colA, colB }) =>
  arr.sort((a, b) => {
    if (a[colA] === b[colA]) {
      return a[colB] < b[colB] ? -1 : 1;
    } else {
      return a[colA] > b[colA] ? -1 : 1;
    }
  });

export const Lowerbar = ({ reacts, commentsTotal, viewsTotal }) => {
  const totalReactionsCount = reacts?.types?.reduce(
    (tot, acc) => (tot += acc?.total),
    0
  );
  const sorted =
    reacts?.types?.length <= 1
      ? reacts?.types
      : sortByTwoProperties({
          arr: reacts?.types,
          colA: "total",
          colB: "emoji",
        });

  return (
    <div
      className="py-2"
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          width: "98%",
          borderTop: "1px solid " + colors.gray,
          left: "1%",
        }}
      />
      {/* REACTIONS */}
      <Snippet
        color={colors.white}
        style={{
          width: "fit-content",
          cursor: "default",
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
        text={
          <>
            <div
              style={{
                display: "flex",
                gap: 5,
                alignItems: "center",
                justifyContent: "center",
                width: "fit-content",
              }}
            >
              {sorted?.map((a, i) => (
                <Snippet
                  key={i}
                  style={{
                    backgroundImage: `url(/images/post/reaction/${a.emoji.toLowerCase()}.svg)`,
                    backgroundColor: reactionsBg.find(
                      (e) => e.name.toLowerCase() === a.emoji.toLowerCase()
                    ).bg,
                    backgroundSize: "60%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: 25,
                    height: 25,
                    borderRadius: 4,
                    cursor: "pointer",
                  }}
                  tooltip={{
                    top: "+5px",
                    right: "-25px",
                    value: `${a.total} person${a.total === 1 ? "" : "s"}`,
                    tooltip_style: {
                      whiteSpace: "nowrap",
                      background: colors.white + "20",
                      border: "none",
                    },
                  }}
                />
              ))}
            </div>
            <Snippet
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: 12,
              }}
              text={`${totalReactionsCount} reaction${
                totalReactionsCount === 1 ? "" : "s"
              }`}
            />
          </>
        }
      />
      {/* COMMENTS */}
      <Snippet
        color={colors.white}
        style={{
          width: "fit-content",
          cursor: "default",
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
        }}
        text={
          <>
            <div>{commentsTotal}</div>
            <div>comment{commentsTotal === 1 ? "" : "s"}</div>
          </>
        }
      />

      {/* VIEWS */}

      <Snippet
        color={colors.white}
        style={{
          width: "fit-content",
          cursor: "default",
          fontSize: 12,
          display: "flex",
          flexDirection: "column",
        }}
        text={
          <>
            <div>{viewsTotal}</div>
            <div>person{viewsTotal === 1 ? "" : "s"} saw this</div>
          </>
        }
      />
    </div>
  );
};
