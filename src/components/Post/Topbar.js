import { useEffect, useState } from "react";
import { useColors } from "../../colors";
import { getMonth } from "../functions/getMonth";
import { getTimeFromSeconds } from "../functions/getTimeFromSeconds";
import LargeContainer from "../generalComps/LargeContainer";
import Snippet from "../generalComps/Snippet";
import { toMap } from "./Topbar/toMap";
import { User } from "./Topbar/User";

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
  const colors = useColors();
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
  }, [created_at]);
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
          {toMap({
            actives,
            commentsVisible,
            hideComments,
            id,
            isReactable,
            isShareable,
            own,
            reacting,
            setactives,
            showComments,
          }).map((a, i) =>
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
                useHook={a.useHook}
              />
            ) : null
          )}
        </LargeContainer>
      ) : null}
    </div>
  );
};
