import { useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../colors";
import { Content } from "./Post/Content";
import Overlay from "./Post/Overlay";
import { Topbar } from "./Post/Topbar";
export const Post = ({
  id,
  edits,
  react,
  multimedia,
  tagged_persons,
  commentsCount,
  owner,
  content,
  hasCommented,
  hasShared,
  isCommentable,
  isReactable,
  isShareable,
  hasEdits,
  activity,
  place,
  overlay
}) => {
  const currentUsername = useSelector(state=>state.auth.username)
  const [postWidth, setpostWidth] = useState(390)
  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        border: `1px solid ${colors.gray}`,
        maxWidth: (postWidth < 650 && postWidth >= 390 && postWidth) ||650,
        minWidth: (!multimedia || multimedia?.length === 0) ? 620 : 390,
        transition: ".3s ease all",
        paddingBottom:15,
        background: "#17191b"
      }}
      className="w-100 w-md-auto my-3"
    >

      <Topbar
        id={id}
        owner={owner}
        currentUsername={currentUsername}
        isEditable={tagged_persons?.length === 0 && multimedia?.length === 0 }
        hasCommented={hasCommented}
        hasShared={hasShared}
        reactsTotal={react?.types?.reduce(
          (tot, acc) => (tot += acc?.total),
          0
        )}
        ownReaction={react?.ownReaction}
        commentsTotal={commentsCount}
        hasEdits={hasEdits}
        isCommentable={isCommentable}
        isReactable={isReactable}
        isShareable={isShareable}
        postWidth={postWidth}
        followedByViewer={owner.followed}
      />

      <Content
        medias={multimedia}
        text={edits[0]?.text||content}
        tagged={tagged_persons}
        hasEdits={hasEdits}
        isOwner={owner.username === currentUsername}
        activity={activity}
        place={place}
        postWidth={postWidth}
        setpostWidth={setpostWidth}
      />
      {
        overlay ? 
          <Overlay
            id={id}
          >
          {overlay}
          </Overlay>
        :null
      }
    </div>
  );
};
