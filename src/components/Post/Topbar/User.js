import { UserPic } from "../../generalComps/UserPic";
export const User = ({ showLowerBar, id, isOwner, ownerID, ...props }) => {
  return (
    <UserPic
      // onClick={() =>
      //   isOwner
      //     ? setOverlay({
      //         postID: id,
      //       })
      //     : null
      // }
      id={ownerID}
      className="px-2 pt-2"
      showLowerBar={typeof showLowerBar === "boolean" ? showLowerBar : false}
      {...props}
    />
  );
};
