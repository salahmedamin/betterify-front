import { Redirect } from "react-router";
import { useEffect, useState } from "react"
import { colors } from "../../../colors";
import { UserPic } from "../../generalComps/UserPic";
import { Audio } from "../Content/Media/Current/Types/Audio";
import { getTimeFromSeconds } from "../../functions/getTimeFromSeconds";
import { VideoPlayer } from "../../generalComps/VideoPlayer";
import { Text } from "../Content/Text";
import { File } from "../Content/Media/Current/Types/File";
import { Image } from "../Content/Media/Current/Types/Image";
import Snippet from "../../generalComps/Snippet";
import { emptyReplies } from "../../../dispatches/replies/emptyReplies";
import { getReplies } from "../../../async/replies/getReplies";
import { repliesIndexInc } from "../../../dispatches/replies/repliesIndexInc";
import { useSelector } from "react-redux"
import { hideReplies } from "../../../dispatches/replies/hideReplies";
import { Loading } from "../../../Loading";

export const OneComment = ({
  writer: { username, profilePic, firstName, lastName, followed } = {},
  highestReact,
  isEdited,
  currentReact,
  id,
  multimedia,
  tagged,
  content,
  repliesCount,
  repliesIndex,
  showReplies,
  loadings=[],
  isReply = false,
  className=" border-top border-bottom border-dark"
}) => {
  const media = multimedia[0]
  const condition = !isReply && repliesCount > 0 && (repliesCount-((repliesIndex+1)*10)) > 0
  const replies = useSelector(state => state.posts.replies.filter(a=>a.replyToID === id))
  useEffect(() => {
    if(repliesIndex === -1 || repliesCount === 0 || isReply) return;
    (async()=> await getReplies({id, index: repliesIndex}))()
    return () => repliesCount > 0 && repliesIndex > -1 && !isReply && replies?.length > 0 ? emptyReplies({commentID: id}) : undefined
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repliesIndex])


  return (
    <>
      <div
        className={"py-3 d-flex align-items-start "+className}
        style={{
          marginLeft: 20,
        }}
      >
        <div
          style={{
            backgroundColor: !isReply ? colors.white+"05" : undefined,
            border: isReply ? `1px solid ${colors.gray}` : undefined,
            color: colors.white,
            fontSize: 13,
            minWidth: isReply ? 254 : "100%"
          }}
          className="p-2 rounded"
        >
          <UserPic
            showLowerBar={false}
            picture={profilePic}
            username={username}
            followedByViewer={followed}
            name={firstName + " " + lastName}
            onClick={() => <Redirect to={`/@${username}`} />}
            className={`${content.length > 0 ? "mb-4" : ""}`}
            isComment={true}
            showName={false}
            picStyle={{
              minWidth: 35,
              minHeight: 35,
              marginRight: 10
            }}
          />
          {
            content?.length > 0 ?
              <Text
                  tagged={tagged}
                  text={content}
                  isPost={false}
              />
            :null
          }
          <div>
            {multimedia.length > 0 ? (
              <div className="mt-2 py-2">
                {media.type === "audio" ? (
                  <Audio
                    current={media.unique}
                    duration={getTimeFromSeconds(media.duration)}
                    showWave={false}
                  />
                ) 
                : media.type === "image" ?
                    <Image
                      {...media}
                      style={{
                        minWidth: content?.length > 0 ? 140 : 250,
                        minHeight: content?.length > 0 ? 140 : 250,
                        height: undefined,
                        width: undefined,
                        position: "relative",
                        backgroundSize: content?.length > 0 ? "contain" : "cover"
                      }}
                      className="col-12"
                    />
                :
                media.type === "video" ?
                    <VideoPlayer 
                        _duration={media.duration}
                        list={media.video_qualities}
                        id={media.id}
                    />
                :
                media.type === "file" ?
                    <File
                        isWhite={true}
                        size={media.size}
                        name={media.name}
                        unique={media.unique}
                        style={{
                          width: 35,
                          height: 50,
                          marginRight: 10
                        }}
                        parentStyle={{
                          flexDirection: undefined,
                          width: undefined
                        }}
                    />
                :null}
              </div>
            ) : null}
          </div>
          {
            showReplies && !loadings.includes("replies") ?
              <>
              <div style={{fontWeight: "bold",color: colors.white, display:"flex", justifyContent:"space-between"}} className="my-2">
                <span style={{cursor:"pointer"}}>Replies({repliesCount})</span>
                <span
                  style={{cursor:"pointer"}}
                  onClick={()=>{
                    hideReplies({id})
                    emptyReplies({commentID: id})
                  }}
                >Hide</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "scroll"
                }}
                className="hidescrollbar"
              >
              {
                replies.map((a,i)=><OneComment key={i} {...a} isReply={true} className={i===replies?.length-1 ? "" : undefined} />)
              }
              </div>
              </>
            :null
          }
          {
            loadings.includes("replies") ? 
            <div
              style={{display:"flex", alignItems:"center",justifyContent:"flex-start", marginTop: 8}}
            >
            <Loading
              spinnerColor={colors.whiteBlue}
              style={{
                width: 30,
                height:30
              }}
              spinnerStyle={{
                width: 30,
                height: 30
              }}
            />
            </div>
            :null
          }
          {
            condition ?
              <Snippet
                cb={()=>repliesIndexInc({id})}
                text={
                <span
                  style={{cursor:"pointer"}}
                >
                  See replies {repliesCount}
                </span>}
                style={{
                  cursor: "default",
                  display: condition ? "block" : "flex",
                  justifyContent: !condition ? "flex-end":undefined,
                  borderTop: "1px solid "+colors.white+"20",
                  paddingTop: 5,
                  marginTop: 5,
                  fontSize: 11,
                  fontWeight: "bold"
                }}
              />
            :null
          }
        </div>
      </div>
    </>
  );
};
