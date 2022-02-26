import { store } from "../../redux/store";

export const setReplies = ({data})=>store.dispatch({
    type: "COMMENTS_SET_REPLIES",
    data
})