import { store } from "../../redux/store"

export const setPosts = ({data})=>{
    store.dispatch({
        type:"POSTS_SET",
        data
    })
}