import { memo, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getComments } from "../../async/comments/getComments";
import { useColors } from "../../colors";
import { emptyComments } from "../../dispatches/comments/emptyComments";
import { emptyReplies } from "../../dispatches/replies/emptyReplies";
import { Loading } from "../../Loading";
import { DropDown } from "../generalComps/DropDown";
import { EnlargeOnEvent } from "../generalComps/EnlargeOnEvent";
import WriteText from "../generalComps/WriteText";
import { commentFilters, groups } from "./Comments/commentsFilters";
import { OneComment } from "./Comments/OneComment";

export const Comments = memo(
  ({ postID, fetchedComments, setfetchedComments, isCommentable, userID }) => {
    //async/await to get comments, in case post with id has !fetchedComments
    const comments = useSelector((state) =>
      state.posts.comments?.filter((a) => a.postID === postID)
    );
    // const post = useSelector((state) =>
    //   state.posts.list.find((a) => a.id === postID)
    // );

    const [selected, setselected] = useState({
      groupID: "date",
      index: 0,
    });

    const [enlarge, setenlarge] = useState(false);
    const [commentsIndex, setcommentsIndex] = useState(0);
    const [forceLoading, setforceLoading] = useState(false);
    const [beingRepliedToID, setbeingRepliedToID] = useState();
    const onReply = ({ cancel, id }) =>
      setbeingRepliedToID(cancel ? undefined : id);
    const ref = useRef();

    const selected__ = commentFilters.filter(
      (a) => a.groupID === selected.groupID
    )[selected.index];

    useEffect(() => {
      setcommentsIndex(0);
    }, [selected__.order, selected__.groupID]);

    useEffect(() => {
      (async () => {
        setforceLoading(true);
        await getComments({
          postID,
          _index: commentsIndex,
          order: selected__?.order,
          orderBy: selected__?.groupID,
        });
        setfetchedComments(true);
        setforceLoading(false);
      })();
      return () => {
        emptyComments({ id: postID });
        emptyReplies({ postID });
        setfetchedComments(false);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [commentsIndex, selected__.order, selected__.groupID]);

    const colors = useColors();
    const ref1 = useRef();
    const ref2 = useRef();
    try {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            // maxHeight: 600,
            position: "relative",
          }}
        >
          {comments?.length > 1 ? (
            <EnlargeOnEvent
              shrinkOnClickOutside
              style={{
                position: "absolute",
                top: 0,
                right: 25,
                border: "1px solid " + colors.gray,
                borderBottomLeftRadius: 6,
                borderBottomRightRadius: 6,
                zIndex: 20,
                cursor: "pointer",
                paddingTop: 5,
                paddingBottom: 5,
                background: colors.gray + "30",
              }}
              setvalue={setenlarge}
              useOnHeight={true}
              useOnWidth={true}
              allowOverflowOnEnlarge={true}
              event={{
                click: true,
              }}
              ref={{
                ref1,
                ref2,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "fit-content",
                }}
                ref={ref1}
              >
                <div
                  ref={ref2}
                  style={{
                    width: 40,
                    height: 30,
                    backgroundImage: `url(/images/general/gear_${
                      enlarge ? "white" : "grey"
                    }.svg)`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
                <DropDown
                  initHeight={30}
                  parentClassName={"hidescrollbar__thin"}
                  parentStyle={{
                    marginLeft: 15,
                    marginRight: 15,
                    width: 200,
                    overflowY: "scroll",
                    background: colors.gray + "80",
                    backdropFilter: "blur(10px)",
                    alignItems: "center",
                    display: "flex",
                  }}
                  _selected={selected}
                  _setselected={setselected}
                  selectedText={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <div
                        style={{
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          backgroundImage: `url(${selected__.image})`,
                          height: 20,
                          width: 20,
                        }}
                      />
                      <div
                        style={{
                          fontSize: 14,
                        }}
                      >
                        {groups.find((a) => a.id === selected__.groupID).name +
                          " - " +
                          selected__.name}
                      </div>
                    </div>
                  }
                  options={commentFilters}
                  groups={groups}
                />
              </div>
            </EnlargeOnEvent>
          ) : null}
          <div
            style={{
              overflowY: "scroll",
              backgroundColor: colors.black + "65",
              backdropFilter: "blur(25px)",
              transition: ".3s ease all",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              borderTop: "1px solid " + colors.gray,
              paddingTop: 25,
              paddingBottom: 25,
            }}
            className={`hidescrollbar${
              comments.length === 0 && !fetchedComments ? " py-3" : ""
            }`}
          >
            {(comments?.length === 0 && !fetchedComments) || forceLoading ? (
              <Loading
                style={{
                  zIndex: 500,
                  width: "100%",
                  height: "100%",
                }}
                spinnerStyle={{
                  width: 50,
                  height: 50,
                }}
                spinnerColor={colors.white}
              />
            ) : comments?.length === 0 && fetchedComments ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: colors.white,
                }}
                className="py-3 w-100"
              >
                No one has yet commented
              </div>
            ) : (
              comments
                ?.filter((e) => !e.replyToID)
                ?.map((a, i) => (
                  <OneComment
                    key={i}
                    onReply={() =>
                      onReply({ cancel: beingRepliedToID === a.id, id: a.id })
                    }
                    beingRepliedTo={beingRepliedToID === a.id}
                    ref={ref}
                    canReply={isCommentable}
                    {...a}
                  />
                ))
            )}
          </div>
          <WriteText
            replyToID={beingRepliedToID}
            ref={ref}
            id={postID}
            userID={userID}
            isComment={true}
            isWriteable={isCommentable}
          />
        </div>
      );
    } catch (e) {
      console.log(e.message);
    }
  }
);
