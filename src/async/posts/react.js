import axios from "axios";
import { setReaction } from "../../dispatches/posts/setReaction";
import { store } from "../../redux/store";
import { routes } from "../../routes";

export const react = async ({ postID, emoji }) => {
  try{
    const userID = store.getState().auth.id
    const data = await axios.post(
      process.env.REACT_APP_API + routes.action.posts.react,
      {
        userID,
        reactorID: userID,
        emoji,
        postID
      }
    );
    if(data.data.success) setReaction({ id: postID, react: emoji })
    else throw new Error(data.data.error)
  }
  catch(e){
    console.log(e)
  }
};
