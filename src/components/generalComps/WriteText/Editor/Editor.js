import {
  ContentState,
  convertToRaw /*Modifier, SelectionState*/,
  EditorState,
} from "draft-js";
import createEmojiPlugin from "draft-js-emoji-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";
import createHashtagPlugin from "draft-js-hashtag-plugin";
import "draft-js-hashtag-plugin/lib/plugin.css";
import createMentionPlugin from "draft-js-mention-plugin";
import "draft-js-mention-plugin/lib/plugin.css";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import React, { useEffect, useRef, useState } from "react";
import { getMentions } from "../../../../async/user/getMentions";
import { useColors } from "../../../../colors";
import { Loading } from "../../../../Loading";
import { UserPic } from "../../UserPic";
import "./emojiStyles.css";
import { extractDataFromState } from "./extractDataFromState";

const style = (colors) => ({
  width: "100%",
  display: "flex",
  gap: 5,
  background: colors.black,
  boxShadow: "0px -3px 5px 1px " + colors.black,
  border: "1px solid " + colors.gray,
  overflowX: "scroll",
  zIndex: 200,
  padding: 5,
  paddingBottom: 0,
  transition: ".3s ease all",
});
const emojiPlugin = createEmojiPlugin({
  selectButtonContent: (
    <div
      style={{
        backgroundImage: "url(/images/post/topbar/react_inactive.svg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: 25,
        height: 25,
      }}
    />
  ),
});
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
const _editorState = EditorState.createEmpty();
const hashtagPlugin = createHashtagPlugin();
const mentionPlugin = (colors) =>
  createMentionPlugin({
    mentionTrigger: "@",
    positionSuggestions: () => {
      return {
        position: "absolute",
        bottom: "100%",
        left: 0,
      };
    },
    mentionComponent: ({ mention, entityKey, decoratedText, ...props }) => (
      <span
        {...props}
        // onClick={(e) => console.log(e)}
        style={{ background: colors.gray, color: colors.white }}
      >
        {mention.username}
      </span>
    ),
  });
const extractMentSugg = (colors) => {
  const { MentionSuggestions } = mentionPlugin(colors);
  return MentionSuggestions;
};
const plugins = (colors) => [hashtagPlugin, emojiPlugin, mentionPlugin(colors)];

export const WritingEditor = React.forwardRef(
  (
    {
      placeholder,
      useSuggestion = true,
      setfocused = () => undefined,
      setstate,
      emptify,
    },
    _ref
  ) => {
    const colors = useColors();
    const MentionSuggestions = extractMentSugg(colors);
    const ref = useRef();
    const [editorState, seteditorState] = useState(_editorState);
    const [suggestions, setsuggestions] = useState([]);
    const [addedMentions, setaddedMentions] = useState([]);
    const [isLoadingMentions, setisLoadingMentions] = useState(false);

    const onChange = (editorState) => {
      const _state = convertToRaw(editorState.getCurrentContent());
      setaddedMentions(
        extractDataFromState({ state: _state, getMentionsOnly: true })
      );
      seteditorState(editorState);
      setstate(_state);
    };
    const onSearchChange = async ({ value }) => {
      if (value.length === 0) {
        setsuggestions([]);
        return;
      }
      setisLoadingMentions(true);
      setsuggestions([{}]);

      const result = await getMentions({
        keyword: value,
        postID: 1,
        type: "comment",
        notIn: addedMentions?.map((a) => a.username).filter((a) => a),
      });
      setsuggestions(result?.length > 0 ? result : [{}]);
      setisLoadingMentions(false);
    };
    const onAddMention = () => {
      setsuggestions([]);
    };

    useEffect(() => {
      seteditorState(
        EditorState.createWithContent(ContentState.createFromText(""))
      );
      setaddedMentions([]);
      setisLoadingMentions(false);
      setsuggestions([]);
    }, [emptify]);

    return (
      <>
        {useSuggestion ? (
          <MentionSuggestions
            onSearchChange={onSearchChange}
            suggestions={suggestions}
            onAddMention={onAddMention}
            entryComponent={({
              mention,
              searchValue,
              isFocused,
              className,
              ...props
            }) => {
              return !isLoadingMentions ? (
                suggestions.length > 0 &&
                suggestions[0]?.username !== undefined ? (
                  <UserPic
                    key={Math.random() * 400}
                    hover={true}
                    style={{ width: "fit-content", minHeight: 50 }}
                    showLowerBar={false}
                    picture={mention.profilePic}
                    username={mention.username}
                    name={mention.name}
                    showName={true}
                    {...props}
                  />
                ) : (
                  <div
                    key={Math.random() * 400}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: colors.white,
                      padding: 10,
                    }}
                  >
                    <div>No persons match the search</div>
                  </div>
                )
              ) : (
                <Loading
                  key={Math.random() * 400}
                  spinnerColor={colors.white}
                  spinnerStyle={{
                    width: 30,
                    height: 30,
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              );
            }}
            style={style(colors)}
          />
        ) : null}
        <Editor
          editorState={editorState}
          onChange={onChange}
          plugins={plugins(mentionPlugin(colors))}
          ref={_ref || ref}
          onFocus={() => setfocused(true)}
          onBlur={() => setfocused(false)}
          placeholder={placeholder}
        />
        <EmojiSuggestions />
        <div
          style={{
            alignSelf: "flex-end",
          }}
        >
          <EmojiSelect />
        </div>
      </>
    );
  }
);
