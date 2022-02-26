import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../colors";
import { Comments } from "./Post/Comments";
import { Content } from "./Post/Content";
import { Lowerbar } from "./Post/Lowerbar";
import Overlay from "./Post/Overlay";
import { Reactions } from "./Post/Reactions";
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
  isShared,
  sharedCount,
  originalPost,
  isCommentable,
  isReactable,
  isShareable,
  hasEdits,
  activity,
  place,
  overlay,
  urls,
  created_at,
  viewCount
}) => {
  const currentUsername = useSelector(state=>state.auth?.username)
  const [postWidth, setpostWidth] = useState(600)
  const [showComments, setshowComments] = useState(false)
  const [fetchedComments, setfetchedComments] = useState(false);
  const reacting = useSelector(state=>state.posts.showReactions).filter(a=>a===id).length > 0
  const _owner = useSelector(state=>state.users.find(a=>a.id === owner.id))
  
  const [useBorder, setuseBorder] = useState(window.innerWidth > 558)

  useEffect(() => {
    const set = ()=>setuseBorder(window.innerWidth>558)
    window.addEventListener("resize", set)
    return ()=> window.removeEventListener("resize", set)
  }, []);

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        borderTop: `1px solid ${colors.gray}`,
        borderBottom: `1px solid ${colors.gray}`,
        borderLeft: useBorder ? `1px solid ${colors.gray}` : undefined,
        borderRight: useBorder ? `1px solid ${colors.gray}` : undefined,
        transition: ".3s ease all",
        background: "#17191b",
        maxWidth: postWidth >= 854 ? postWidth: undefined,
        overflow: "hidden"
      }}
      className="col-12 col-sm-10 col-md-8 col-lg-5 my-3"
    >

      <Topbar
        id={id}
        owner={_owner}
        currentUsername={currentUsername}
        followedByViewer={_owner?.followed}
        postWidth={postWidth}
        editing={{
          isEditable: tagged_persons?.length === 0 && multimedia?.length === 0,
          isEdited: hasEdits
        }}
        created_at={created_at}
        comments={{
          isCommentable,
          showComments: ()=>setshowComments(true),
          hideComments: ()=>{
            setshowComments(false)
          },
          commentsVisible: showComments,
        }}
        sharing={{
          hasShared,
          isShareable
        }}
        reactions={{
          own: react?.ownReaction,
          isReactable,
          reacting
        }}
      />
      {
        (Array.isArray(multimedia) && multimedia?.length > 0) || edits[0]?.text?.length > 0 || content?.length > 0 || Object.keys(activity).length > 0 || place ?
          <Content
            medias={multimedia}
            text={edits[0]?.text||content}
            tagged={tagged_persons}
            hasEdits={hasEdits}
            isOwner={_owner?.username === currentUsername}
            activity={activity}
            place={place}
            postWidth={postWidth}
            setpostWidth={setpostWidth}
            urls={urls}
          />
        :null 
      }
      {
        overlay ? 
          <Overlay
            id={id}
          >
          {overlay}
          </Overlay>
        :null
      }



      {/* SHARED CASE */}
      {
        isShared ?
        <div
          style={{
            position: "relative",
            display: "inline-block",
            border: `1px solid ${colors.gray+"80"}`,
            transition: ".3s ease all",
            paddingBottom:!showComments ? 15 : 0,
            overflowY: "hidden",
            marginLeft: "8.5%"
          }}
        className="col-10"
      >
        <Topbar
          showTime={false}
          showRightSide={false}
          id={originalPost.id}
          owner={originalPost.owner}
          currentUsername={currentUsername}
          postWidth={postWidth}
          sharing={{
            hasShared,
            sharedCount,
          }}
          showLowerBar={false}
        />
        <Content
          medias={originalPost.multimedia}
          text={originalPost.edits[0]?.text||originalPost.content}
          tagged={originalPost.tagged_persons}
          hasEdits={originalPost.hasEdits}
          activity={originalPost.activity}
          place={originalPost.place}
          postWidth={344}
          urls={originalPost.urls}
      />
      </div>
      :null
      }

      <Lowerbar
        commentsTotal={commentsCount}
        reacts={react}
        viewsTotal={viewCount}
      />

      {/* SHOW/HIDE REACTIONS */}
      {
        reacting?
        <Reactions own={react?.ownReaction} id={id}/>
        :null
      }


      {/* SHOW/HIDE COMMENTS */}
      {
        showComments ? <Comments isCommentable={isCommentable} postID={id} fetchedComments={fetchedComments} setfetchedComments={setfetchedComments}/> : null
      }
    </div>
  );
};
