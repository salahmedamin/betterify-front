import { store } from "../../redux/store"

export const emptyComments = ({id})=>{
    store.dispatch({
        type:"POST_EMPTY_COMMENTS",
        id
    })
}