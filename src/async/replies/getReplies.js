import axios from "axios";
import { setLoading } from "../../dispatches/comments/setLoading";
import { setReplies } from "../../dispatches/replies/setReplies";
import { store } from "../../redux/store";
import { routes } from "../../routes";

export const getReplies = async({id, index=0})=>{
    const userID = store.getState().auth.id
    setLoading({data:"replies",type:"add", id})
    const data = await axios.post(
        process.env.REACT_APP_API+routes.get.comments.replies,
        {
            userID,
            commentID: id,
            index
        }
    )
    setReplies({data: data.data})
    setLoading({data:"replies",type:"delete", id})
}