import { formatEditorState } from "../formatEditorState";
import { checkCanSend } from "./checkCanSend"

export const purgeEmptyOnSend = ({files, state, stateRequiresFormat=true}) => {
    const formd = stateRequiresFormat ? formatEditorState({
        state,
    }) : state
    const canSend = checkCanSend( {files, state, stateRequiresFormat} )
    // console.log(canSend)
    if(!canSend.success) return false
    if(!canSend.requiresPurge) return formd

    const diff = canSend.first
    return {
        ...formd,
        content: formd.content?.map(a=>({
            ...a,
            line: a.line-diff
        }))?.filter(a=>a.line>=0),
        taggedPersons: formd.taggedPersons?.map(a=>({
            ...a,
            line: a.line-diff
        }))
    }

}
