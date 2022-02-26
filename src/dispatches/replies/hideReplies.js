import { store } from "../../redux/store";

export const hideReplies = ({id})=>store.dispatch({
    type: "COMMENTS_HIDE_REPLIES",
    id
})