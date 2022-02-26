import axios from "axios";
import { store } from "../../redux/store";
import { routes } from "../../routes";

export const getMentions = async ({
  keyword,
  postID,
  groupID = undefined,
  notIn = [],
  type,
}) => {
  const userID = store.getState().auth.id;
  const data = await axios.post(
    process.env.REACT_APP_API + routes.get.user.mention,
    {
      keyword,
      postID,
      groupID,
      notIn,
      type,
      userID
    }
  );
  return data.data
};
