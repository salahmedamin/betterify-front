import React, { useEffect, useRef, useState } from "react";
import { colors } from "../../../colors";
import {HorizontalScroll} from "../../generalComps/HorizontalScroll";
import Snippet from "../../generalComps/Snippet";
import { TextWithTags } from "../../generalComps/Text";

export const Text = ({
  text,
  tagged,
  hasEdits,
  activity,
  place,
  hasMedia,
  postWidth,
  urls,
  isPost=true,
  textStyle={}
}) => {
  const textHolder = useRef()
  const [tagDone, settagDone] = useState(false);
  const [conv, setconv] = useState(TextWithTags(text));
  TextWithTags(text)
  const [useReadMore, setuseReadMore] = useState(false);
  const [textHeight, settextHeight] = useState(
    textHolder?.current?.getBoundingClientRect().height
  );
  const [showmore, setshowmore] = useState(false);

  useEffect(() => {
    if(!tagDone){
      setconv(TextWithTags(text, tagged, undefined, urls));
      settagDone(true)
    }
    const { height } = textHolder?.current?.getBoundingClientRect();
    if (height > 343) {
      setuseReadMore(true);
      settextHeight(postWidth < 650 ? height + 100 : height);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postWidth, tagDone, text, tagged]);

  return (
    <div
      style={{
        color: colors.white,
      }}
      className={`${isPost ? "px-3" : ""}`}
    >
      {(typeof activity === "object" && Object.keys(activity).length > 0) || place ? (
        <HorizontalScroll
          maxWidth={"100%"}
          overflowXScroll={true}
          style={{
            display: "flex",
            marginBottom: 10,
            marginTop: 10,
            position: "relative",
            borderBottom: "1px solid " + colors.gray,
            paddingBottom: 4,
          }}
        >
          {place ? (
            <Snippet
            key={1}
              style={{
                marginRight: activity ? 10 : 0,
                fontSize: 11,
                border: `1px solid ${colors.gray}`,
                borderRadius: 5,
                whiteSpace: "nowrap",
              }}
              cb={() => undefined}
              color={colors.white}
              text={place}
              image={{
                path: "/images/post/content/position.svg",
                width: 16,
                height: 18,
              }}
              tooltip={{
                right: "5px",
                tooltip_style:{
                  border: "1px solid "+colors.gray,
                  color: colors.white,
                  backgroundColor: colors.body,
                  zIndex: 30,
                  boxShadow: "0px 0px 30px 5px rgb(0,0,0,.8)"
                },
                value: "Place",
              }}
            />
          ) : null}
          {(typeof activity === "object" && Object.keys(activity).length > 0) ? (
            <Snippet
            key={2}
              style={{
                fontSize: 11,
                border: `1px solid ${colors.gray}`,
                borderRadius: 5,
                whiteSpace: "nowrap",
              }}
              cb={() => undefined}
              color={colors.white}
              text={`${activity.name}${
                activity.complimentary ? " " + activity.complimentary.text : ""
              }`}
              image={{
                path: `/images/post/content/activites/${activity.thumbnail}.svg`,
                width: 20,
                height: 20,
              }}
              tooltip={{
                left: "5px",
                tooltip_style:{
                  border: "1px solid "+colors.gray,
                  color: colors.white,
                  backgroundColor: colors.body,
                  zIndex: 30,
                  boxShadow: "0px 0px 30px 5px rgb(0,0,0,.8)"
                },
                value: "Activity",
              }}
              custom={
                activity.with ? (
                  <span style={{ marginLeft: 5 }}>
                    with
                    <span
                      style={{
                        backgroundColor: colors.coolors.charocal,
                        color: colors.white,
                        padding: 4,
                        marginLeft: 5,
                        fontSize: 10,
                      }}
                    >
                      {activity.with.length > 1
                        ? activity.with.length + " persons"
                        : "@" + activity.with[0]}
                    </span>
                  </span>
                ) : null
              }
            />
          ) : null}
        </HorizontalScroll>
      ) : null}
      <div
        ref={textHolder}
        style={{
          marginTop: !hasMedia && isPost ? 30 : 0,
          marginBottom: !hasMedia && isPost ? 10 : 0,
          maxHeight: showmore || !useReadMore ? textHeight : 38,
          overflow: "hidden",
          transition: ".4s ease all",
          fontSize: 14,
          ...textStyle
        }}
      >
        {
          conv.map((e,x)=>
          <div key={x}>
            {e.map((a,i)=>
              a
            )}
            </div>
          )
        }
      </div>
      {(hasEdits) || useReadMore ? (
        <div
          style={{
            display: "flex",
            // borderTop: "1px solid "+colors.gray,
            paddingTop: 4,
            paddingBottom: 10
          }}
        >
          {hasEdits ? (
            <Snippet
            key={3}
              style={{
                fontSize: 12,
                marginRight: 10,
              }}
              cb={() => undefined}
              color={colors.white}
              bgColor={colors.gray}
              text="Show edits"
              image={{
                path: "/images/post/content/edit.svg",
                width: 12,
                height: 12,
              }}
            />
          ) : null}
          {useReadMore ? (
            <Snippet
            key={4}
              cb={() => setshowmore(!showmore)}
              bgColor={colors.gray + "90"}
              color={colors.white}
              text={showmore ? "Less" : "More"}
              image={{
                path: `/images/post/content/${
                  !showmore ? "arrow_down" : "arrow_up"
                }.svg`,
                width: 13,
                height: 13,
              }}
              style={{
                fontSize: 12,
              }}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};
