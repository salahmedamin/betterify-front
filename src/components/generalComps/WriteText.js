// import { EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { commentOnPost } from "../../async/posts/comment";
import { useColors } from "../../colors";
import { WritingEditor } from "./WriteText/Editor/Editor";
import { formatEditorState } from "./WriteText/formatEditorState";
import LeftSide from "./WriteText/LeftSide";
import { purgeEmptyOnSend } from "./WriteText/validations/purgeEmptyOnSend";
// import micClass from "./WriteText/mic.module.css"
// import {ReactMic} from "react-mic"

const WriteText = React.forwardRef(
  (
    {
      id,
      userID,
      replyToID = undefined,
      isPost = false,
      isComment = false,
      isMessage = false,
      isGroup = false,
      isWriteable = true,
    },
    _ref
  ) => {
    const [files, setfiles] = useState([]);
    const [focused, setfocused] = useState(false);
    const [canSend, setcanSend] = useState(false);
    const [state, setstate] = useState({});
    const [formattedState, setformattedState] = useState({});
    const [emptify, setemptify] = useState(false);
    //   const [records, updateRecords] = useState([]);
    // const [isRecording, setisRecording] = useState(false);
    const [gif, setgif] = useState({});
    // const [blob, setblob] = useState("");

    const commentCallback = async () => {
      await commentOnPost({
        postID: id,
        userID,
        replyToID,
        ...formattedState,
      });
    };

    useEffect(() => {
      if (Object.keys(state)?.length === 0) return;
      setformattedState(
        formatEditorState({
          state,
          files,
          gif,
          isGif: Object.keys(gif).length > 0,
        })
      );
    }, [state, files, gif]);

    useEffect(() => {
      const sendable = purgeEmptyOnSend({
        files,
        state: formattedState,
        stateRequiresFormat: false,
      });
      setcanSend(sendable !== false);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formattedState]);

    const send = async () => {
      if (canSend) {
        if (isComment) await commentCallback();
        setemptify(!emptify);
      }
    };
    const colors = useColors();

    return (
      <div
        className="d-flex w-100 hidescrollbar"
        style={{
          background: colors.black,
          borderTop: "1px solid " + colors.gray,
          display: "flex",
          alignItems: !isWriteable ? "center" : undefined,
          justifyContent: !isWriteable ? "center" : undefined,
          // overflow: "visible",
        }}
        //   onClick={onSend}
      >
        {isWriteable ? (
          <div
            className="w-100 p-2"
            style={{
              position: "relative",
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              // overflowX: "hidden",
              // overflowY: "visible"
            }}
          >
            <LeftSide
              style={{
                opacity: focused ? 0 : 1,
                visibility: focused ? "hidden" : "visible",
                transition: ".3s ease all",
                flexShrink: 1,
              }}
              add={isPost || isMessage}
              setfiles={setfiles}
            />
            <div
              className="px-3 py-2"
              style={{
                minWidth: `calc( 100% - ${
                  !canSend
                    ? focused
                      ? "10px"
                      : "140px"
                    : focused
                    ? "70px"
                    : "140px"
                })`,
                width: `calc( 100% - ${focused ? "10px" : "70px"} )`,
                flexGrow: 1,
                borderRadius: 5,
                border: "1px solid " + colors.gray,
                fontSize: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: ".3s ease all",
                justifySelf: "flex-start",
                color: colors.white,
              }}
            >
              <WritingEditor
                ref={_ref}
                setstate={setstate}
                setfocused={setfocused}
                useSuggestion={(isGroup && isMessage) || !isMessage}
                emptify={emptify}
                placeholder={
                  isPost
                    ? "Let your thoughts in"
                    : isComment
                    ? "Write a comment"
                    : "Write a message"
                }
              />
            </div>
            <div
              // onClick={() => setisRecording(!isRecording)}
              onClick={send}
              style={{
                width: 0,
                minWidth: canSend ? 50 : 0,
                height: 50,
                backgroundColor: colors.gray,
                borderRadius: 4,
                opacity: !canSend ? 0 : 1,
                visibility: !canSend ? "hidden" : "visible",
                transition: ".3s ease all",
                flexShrink: 1,
                backgroundSize: "60%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage: `url(/images/general/send.svg`,
                cursor: canSend ? "pointer" : "default",
              }}
            />
            {/* <br></br> */}
            {/* <ReactMic
            record={isRecording}    
            className={micClass.mic__class}  
            onStop={data=>setblob(data.blobURL)}   
            // onData={function}   
            // onBlock={function}  
            mimeType="audio/mp3"
          />
          {blob.length > 0 ? <audio controls>
              <source src={blob} />
          </audio> : null} */}
          </div>
        ) : (
          <div
            style={{
              color: colors.white,
              display: "flex",
              gap: 10,
            }}
            className="py-3"
          >
            <div
              style={{
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
                backgroundImage: `url(/images/post/content/report.svg)`,
                backgroundSize: "contain",
                height: 20,
                width: 20,
              }}
            />
            {isComment
              ? "Comments have been turned off"
              : isMessage
              ? "Cannot send messages in this chat for now"
              : "Cannot write text for now"}
          </div>
        )}
      </div>
    );
  }
);

export default WriteText;
