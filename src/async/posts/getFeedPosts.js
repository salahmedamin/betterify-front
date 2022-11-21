import axios from "axios";
import { setPosts } from "../../dispatches/posts/setPosts";
import { addUsers } from "../../dispatches/users/addUsers";
import { routes } from "../../routes";

export const getFeedPosts = async ({ index = 0, userID }) => {
  try {
    const data = await axios.post(
      process.env.REACT_APP_API + routes.get.posts.feedPosts,
      {
        userID,
        index,
      }
    );
    const users = data.data?.map((a) => a.owner);
    addUsers({
      users,
    });
    setPosts({ data: data.data });
  } catch (e) {
    console.log(e.stack);
  }
};
