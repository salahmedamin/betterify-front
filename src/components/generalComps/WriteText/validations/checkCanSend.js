import { formatEditorState } from "../formatEditorState"

export const checkCanSend = ({files, state, stateRequiresFormat})=>{
    const formatted = stateRequiresFormat ? formatEditorState({
        state
    }) : state
    let i=0, pass=false
    // console.log(formatted.content)
    while(i<formatted.content?.length){
        if(formatted.content[i]?.text?.trim().length > 0 ){
            pass = true
            break
        }
        i++
    }
    return {
        success: files.length > 0 || pass,
        first: i,
        requiresPurge: i > 0
    }
}