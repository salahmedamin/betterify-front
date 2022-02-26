import { useEffect, useState } from "react";
import { colors } from "../../colors";
import LargeContainer from "../generalComps/LargeContainer";
import Snippet from "../generalComps/Snippet";
import { User } from "./Topbar/User";
import { getTimeFromSeconds } from "../functions/getTimeFromSeconds";
import { getMonth } from "../functions/getMonth";
import { setShowReactions } from "../../dispatches/posts/setShowReactions";
import { reactionsBg } from "./Reactions/reactions_list";
import { react } from "../../async/posts/react";

export const Topbar = ({
  id,
  owner,
  currentUsername,
  created_at,
  comments: { isCommentable, showComments, hideComments, commentsVisible } = {},
  reactions: { own, _total, isReactable, reacting } = {},
  sharing: { hasShared, isShareable } = {},
  showTime = true,
  showRightSide = true,
}) => {
  const [actives, setactives] = useState([]);
  const [time, settime] = useState();
  useEffect(() => {
    const date = new Date(created_at);
    const timed = getTimeFromSeconds((Date.now() - date.getTime()) / 1000);
    if (timed.hours > 24)
      settime(
        date.getDate() +
          " " +
          getMonth(date.getMonth() + 1) +
          ", " +
          date.getFullYear()
      );
    else if (timed.hours > 0) settime(timed.hours + "h ago");
    else if (timed.minutes > 0) settime(timed.minutes + "min ago");
    else settime("few seconds ago");
  }, []);
  return (
    <div
      className={`d-flex align-items-center justify-content-between mb-4 pb-2 ${
        showTime ? "pt-2 " : " "
      }px-0 hidescrollbar pt-1 position-relative`}
    >
      {showTime ? (
        <div
          style={{
            color: colors.white,
            fontSize: 13,
            textAlign: "center",
            position: "absolute",
            top: 0,
            // left: "50%",
            // transform: "translateX(-50%)",
            right: 0,
            borderRadius: 15,
            borderTopRightRadius: 0,
            borderTopLeftRadius: 0,
          }}
          className="px-3 py-1"
        >
          {time}
        </div>
      ) : null}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <User
          showLowerBar={owner?.username !== currentUsername}
          name={owner?.firstName + " " + owner?.lastName}
          username={owner?.username}
          picture={owner?.profilePic}
          isOwner={owner?.username === currentUsername}
          followedByViewer={owner?.followed}
          isFavorite={owner?.isFavorite}
          ownerID={owner?.id}
        />
      </div>
      {showRightSide ? (
        <LargeContainer
          type="h"
          className={`justify-content-around align-items-center py-1`}
          style={{
            position: "relative",
            marginRight: 16,
            gap: 10,
          }}
        >
          {[
            {
              condition: isReactable,
              img: {
                path: own
                  ? `/images/post/reaction/${own}.svg`
                  : `/images/post/topbar/react_${
                      reacting ? "active" : "inactive"
                    }.svg`,
                width: 22,
                height: 22,
                imgStyle: {
                  marginRight: 0,
                },
              },
              active: reacting,
              tooltip: {
                value: "Reaction",
                bottom: "4px",
              },
              style: {
                border: own
                  ? "1px solid transparent"
                  : `1px solid ${reacting ? "transparent" : colors.gray}`,
                background: own
                  ? reactionsBg.find((a) => a.name.toLowerCase() === own)?.bg
                  : undefined,
              },
              onClick: async () =>
                own
                  ? await react({ postID: id, emoji: own })
                  : setShowReactions({ id, value: true }),
              onLongPress: () => setShowReactions({ id, value: true }),
              noHook: own !== undefined,
            },
            {
              condition: true,
              img: {
                path: `/images/post/topbar/comment_${
                  commentsVisible ? "active" : "inactive"
                }.svg`,
                width: 22,
                height: 22,
                imgStyle: {
                  marginRight: 0,
                },
              },
              active: commentsVisible,
              tooltip: {
                value: "Comments",
                bottom: "4px",
              },
              onClick: async () =>
                commentsVisible ? hideComments(false) : showComments(true),
            },
            {
              condition: isShareable,
              img: {
                path: `/images/post/topbar/share_${
                  actives.includes("share") ? "active" : "inactive"
                }.svg`,
                width: 22,
                height: 22,
                imgStyle: {
                  marginRight: 0,
                },
              },
              active: actives.includes("share"),
              tooltip: {
                value: "Share",
                bottom: "4px",
              },
              onClick: () => {
                if (actives.includes("share"))
                  setactives(actives.filter((a) => a !== "share"));
                else {
                  setactives([...actives, "share"]);
                }
              },
            },
          ].map((a, i) =>
            a.condition ? (
              <Snippet
                key={i}
                cb={a.onClick}
                longPressCb={a.onLongPress}
                tooltip={{
                  ...a.tooltip,
                  tooltip_style: {
                    color: colors.white,
                  },
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 16,
                  border: `1px solid ${a.active ? "transparent" : colors.gray}`,
                  borderRadius: "50%",
                  transition: ".3s ease all",
                  ...a.style,
                }}
                bgColor={a.active ? colors.gray + "80" : undefined}
                image={a.img}
                useHook={a.noHook}
              />
            ) : null
          )}
        </LargeContainer>
      ) : null}
    </div>
  );
};
