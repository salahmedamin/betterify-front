import { store } from "../../../redux/store";
import { extractDataFromState } from "./Editor/extractDataFromState";

export const formatEditorState = ({
  state,
  files = [],
  isGif = false,
  gif: {
      gifURL='',
      gifWidth=undefined,
      gifHeight=undefined
  }={},
}) => {
  const userID = store.getState().auth.id;
  const data = extractDataFromState({ state })
  // console.log(data)
  return {
    userID,
    content: data.lines,
    taggedPersons: data.mentions,
    files,
    isGif,
    gif: {
        gifURL,
        gifWidth,
        gifHeight
    }
  }
}
