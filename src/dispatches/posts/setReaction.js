import { store } from "../../redux/store"

export const setReaction = ({id, react})=>{
    store.dispatch({
        type:"POSTS_SET_REACTION",
        id,
        react
    })
}