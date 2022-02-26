import { PostOwnerOverlay } from "../../components/Post/Overlay/Templates/PostOwner";
import { store } from "../../redux/store";

export const setOverlay = ({
    postID,
    hide=false
})=>store.dispatch({
    type: "POSTS_OVERLAY",
      hide,
      id:postID,
      overlay: PostOwnerOverlay({id: postID})
  })