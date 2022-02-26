import { store } from "../../redux/store";



export const emptyReplies = ({commentID, postID})=>store.dispatch({
    type:"COMMENTS_EMPTY_REPLIES",
    commentID,
    postID
})