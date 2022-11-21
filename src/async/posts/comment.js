import axios from "axios";
import { commentOnPostRedux } from "../../dispatches/comments/add";
import { routes } from "../../routes";

export const commentOnPost = async (_data) => {
  try {
    const data = await axios.post(
      process.env.REACT_APP_API + routes.action.posts.comment,
      _data
    );
    commentOnPostRedux({
      comment: data.data,
      postID: _data.postID,
      replyToID: _data.replyToID,
    });
  } catch (e) {
    console.log(e.stack);
  }
};
