import { react } from "../../../async/posts/react";
import { noHooksColors } from "../../../colors";
import { setShowReactions } from "../../../dispatches/posts/setShowReactions";
import { reactionsBg } from "../Reactions/reactions_list";
const noHookColor = noHooksColors();

export const toMap = ({
  actives,
  setactives,
  isShareable,
  isReactable,
  own,
  reacting,
  id,
  commentsVisible,
  hideComments,
  showComments,
}) => [
  {
    condition: isReactable,
    img: {
      path: own
        ? `/images/post/reaction/${own}.svg`
        : `/images/post/topbar/react_${reacting ? "active" : "inactive"}.svg`,
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
        : `1px solid ${reacting ? "transparent" : noHookColor.gray}`,
      background: own
        ? reactionsBg.find((a) => a.name.toLowerCase() === own)?.bg
        : undefined,
    },
    onClick: async () =>
      own
        ? await react({ postID: id, emoji: own })
        : setShowReactions({ id, value: true }),
    onLongPress: () => setShowReactions({ id, value: true }),
    useHook: true,
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
];
