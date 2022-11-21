import { store } from "../../redux/store";

export const commentOnPostRedux = ({
  postID,
  comment,
  commentType = "add",
  replyToID = undefined,
}) => {
  store.dispatch({
    type: "POSTS_COMMENT",
    id: postID,
    comment,
    commentType,
    replyToID,
  });
};
