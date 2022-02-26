import { store } from "../../redux/store"

export const setShowReactions = ({id, value})=>{
    store.dispatch({
        type:"POSTS_SET_SHOW_REACTIONS",
        value,
        id
    })
}