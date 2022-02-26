import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../colors";
import { getComments } from "../../async/comments/getComments";
import { Loading } from "../../Loading";
import WriteText from "../generalComps/WriteText";
import { OneComment } from "./Comments/OneComment";
import { EnlargeOnEvent } from "../generalComps/EnlargeOnEvent";
import { DropDown } from "../generalComps/DropDown";
import { commentFilters, groups } from "./Comments/commentsFilters";
import { emptyComments } from "../../dispatches/comments/emptyComments";
import { emptyReplies } from "../../dispatches/replies/emptyReplies";

export const Comments = ({ postID, fetchedComments, setfetchedComments, isCommentable }) => {
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
  const [forceLoading, setforceLoading] = useState(false)


  const selected__ = commentFilters.filter(
    (a) => a.groupID === selected.groupID
  )[selected.index];


  useEffect(() => {
    setcommentsIndex(0)
  }, [selected__.order, selected__.groupID])

  useEffect(() => {
    (async () => {
      setforceLoading(true)
      await getComments({
        postID,
        _index: commentsIndex,
        order: selected__?.order,
        orderBy: selected__?.groupID,
      });
      setfetchedComments(true)
      setforceLoading(false)
    })();
    return () => {
      emptyComments({id: postID});
      emptyReplies({postID})
      setfetchedComments(false)
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentsIndex, selected__.order, selected__.groupID]);

  
  const ref1 = useRef();
  const ref2 = useRef();

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
            border: "1px solid " + (enlarge ? "transparent" : colors.gray),
            borderTop: "1px solid transparent",
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            zIndex: 20,
            cursor: "pointer",
            paddingTop: 5,
            paddingBottom: 5,
            background: colors.gray+"30"
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
                width: 48,
                height: 40,
                backgroundImage: `url(/images/general/gear_${
                  enlarge ? "white" : "grey"
                }.svg)`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
            <DropDown
              initHeight={40}
              parentClassName={"hidescrollbar__thin"}
              parentStyle={{
                marginLeft: 15,
                marginRight: 15,
                width: 200,
                overflowY: "scroll",
                background: colors.gray + "80",
                backdropFilter: "blur(10px)",
              }}
              _selected={selected}
              _setselected={setselected}
              selectedText={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
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
                  <div>
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
          comments?.map((a, i) => <OneComment key={i} {...a} />)
        )}
      </div>
      <WriteText isComment={true} isWriteable={isCommentable} />
    </div>
  );
};
