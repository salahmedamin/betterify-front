import { store } from "../../redux/store"

export const setLoading = ({id, data, type="add"})=>{
    if(!["add","delete"].includes(type)) return
    store.dispatch({
        type: type === "add" ? "COMMENT_ADD_LOADING" : "COMMENT_DELETE_LOADING",
        data,
        id
    })
}