import React from "react";
import emoji from "react-easy-emoji";
import { useColors } from "../../colors";
import Snippet from "./Snippet";

const emojiRegex =
  /[\u{1f300}-\u{1f5ff}\u{1f900}-\u{1f9ff}\u{1f600}-\u{1f64f}\u{1f680}-\u{1f6ff}\u{2600}-\u{26ff}\u{2700}-\u{27bf}\u{1f1e6}-\u{1f1ff}\u{1f191}-\u{1f251}\u{1f004}\u{1f0cf}\u{1f170}-\u{1f171}\u{1f17e}-\u{1f17f}\u{1f18e}\u{3030}\u{2b50}\u{2b55}\u{2934}-\u{2935}\u{2b05}-\u{2b07}\u{2b1b}-\u{2b1c}\u{3297}\u{3299}\u{303d}\u{00a9}\u{00ae}\u{2122}\u{23f3}\u{24c2}\u{23e9}-\u{23ef}\u{25b6}\u{23f8}-\u{23fa}]/gu;

export const useTextWithTags = () => {
  const colors = useColors();
  return (lines, fontSize) => {
    let total = [];
    const style = {
      display: "inline-block",
      padding: 4,
      paddingLeft: 6,
      paddingRight: 6,
      margin: 2,
      fontSize: fontSize || 14,
    };
    lines.forEach((text) => {
      let splitText = text.text ? text?.text?.split(" ") : [];
      text?.mentions?.forEach(
        (a, i) =>
          (splitText[a.offset] = (
            <Snippet
              key={Math.random() * 1600}
              bgColor={colors.gray}
              color={"#ffffff"}
              text={"@" + a.username}
              cb={() => undefined}
              style={style}
            />
          ))
      );
      text?.urls?.forEach(
        (a, i) =>
          (splitText[splitText.findIndex((x) => x === a)] = (
            <Snippet
              text={
                <div
                  title="Be careful of links, they may contain harmful content"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/images/post/content/report_red.svg"
                    style={{ width: 13, height: 13, marginRight: 5 }}
                    alt="report"
                  />{" "}
                  {a}
                </div>
              }
              key={Math.random() * 1600}
              bgColor={colors.red + "20"}
              color={colors.white}
              cb={() =>
                window.open(
                  ["http", "https"].some((e) => a.startsWith(e))
                    ? a
                    : "http://" + a
                )
              }
              style={style}
            />
          ))
      );
      total = [
        ...total,
        splitText
          .map((a) => (typeof a === "string" ? a + " " : a))
          .reduce(
            (tt, acc) =>
              (tt = [
                ...tt,
                typeof acc === "string" && acc.match(emojiRegex)
                  ? emoji(acc)
                  : acc,
              ]),
            []
          ),
      ];
    });
    return total;
  };
};
