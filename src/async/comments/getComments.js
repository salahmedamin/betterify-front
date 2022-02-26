import axios from "axios"
import { setComments } from "../../dispatches/comments/setComments"
import { store } from "../../redux/store"

export const getComments = async({
    postID,
    orderBy=undefined,
    order=undefined,
    _index=undefined
})=>{
    const userID = store.getState().auth.id
    const index = store.getState().posts.list.find(a=>a.id === postID).commentsIndex
    const data = await axios.post(
        process.env.REACT_APP_API+"posts/comments",
        {
            postID,
            userID,
            index: _index||index||0,
            order,
            orderBy
        }
    )
    setComments({data: data.data, postID})
}