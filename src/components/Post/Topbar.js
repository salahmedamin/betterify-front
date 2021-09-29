import { useSelector } from "react-redux"
import { colors } from "../../colors"
import LargeContainer from "../generalComps/LargeContainer"
import { Round } from "./Topbar/Round"
import { User } from "./Topbar/User"

export const Topbar = ({
  id,
  owner,
  currentUsername,
  reactsTotal,
  ownReaction,
  hasCommented,
  hasShared,
  commentsTotal,
  isEditable,
  isCommentable,
  isReactable,
  isShareable,
  hasEdits,
  followedByViewer
}) => {
  const loadings = useSelector((state) =>
    state.posts.list.find((a) => a.id === id)
  )?.loading;
  return (
    <div
      className={`d-flex align-items-center justify-content-between mb-4 pb-2 px-0 hidescrollbar`}
    >
      <User
        id={id}
        name={owner.firstName + " " + owner.lastName}
        username={owner.username}
        picture={owner.profilePic}
        isOwner={owner.username === currentUsername}
        followedByViewer={followedByViewer}
      />
      <LargeContainer
        type="h"
        className={`justify-content-around py-1`}
        style={{
          position: "relative",
          marginRight: 16
        }}
      >
        <Round
          parentStyle={{
            marginRight: 16,
          }}
          loading={loadings?.includes("react")}
          color={colors.gray}
          disabled={!isReactable}
          pic={{
            height: 22,
            width: 22,
            isModeSensitive: false,
            url: {
              activePic: "react_active",
              inactivePic: "react_inactive",
            },
          }}
          activeSwitchable={false}
          tooltip={{
            value: {
              tooltip_default: "Reaction",
            },
          }}
          isActive={ownReaction !== undefined && isReactable}
          total={reactsTotal}
        />
        <Round
          parentStyle={{
            marginRight: 16,
          }}
          loading={loadings?.includes("comment")}
          color={colors.gray}
          disabled={!isCommentable}
          pic={{
            height: 22,
            width: 22,
            isModeSensitive: false,
            url: {
              activePic: "comment_active",
              inactivePic: "comment_inactive",
            },
          }}
          activeSwitchable={false}
          tooltip={{
            value: {
              tooltip_default: "Comment",
            },
          }}
          isActive={hasCommented && isCommentable}
          total={commentsTotal}
        />
        <Round
          loading={loadings?.includes("share")}
          color={colors.gray}
          disabled={!isShareable}
          pic={{
            height: 22,
            width: 22,
            isModeSensitive: false,
            url: {
              activePic: "share_active",
              inactivePic: "share_inactive",
            },
          }}
          activeSwitchable={false}
          tooltip={{
            value: {
              tooltip_default: "Share",
            },
          }}
          isActive={hasShared && isCommentable}
        />{" "}
        {/** share */}
      </LargeContainer>
      {/* <Container
        id={id}
        hasCommented={hasCommented}
        hasShared={hasShared}
        reactsTotal={reactsTotal}
        commentsTotal={commentsTotal}
        isSecondary={true}
        isCommentable={isCommentable}
        isReactable={isReactable}
        isShareable={isShareable}
        isOwner={owner.username === currentUsername}
      /> */}
    </div>
  );
};
