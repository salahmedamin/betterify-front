import { store } from "../../redux/store";

export const repliesIndexInc = ({id})=>store.dispatch({
    type: "COMMENTS_REPLIES_INDEX_INC",
    id
})