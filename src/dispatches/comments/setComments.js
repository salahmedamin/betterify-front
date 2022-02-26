import { store } from "../../redux/store"

export const setComments = ({postID, data})=>{
    store.dispatch({
        type:"POST_GET_COMMENTS",
        id: postID,
        comments: data
    })
}