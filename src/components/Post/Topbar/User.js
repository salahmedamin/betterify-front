import { useDispatch } from "react-redux";
import { colors } from "../../../colors";
import LargeContainer from "../../generalComps/LargeContainer";
import OverlayRow from "../Overlay/OverlayRow";
import { OverlayData } from "./OverlayData";

export const User = ({ username, name, picture, id, isOwner, followedByViewer }) => {
  const disp = useDispatch()
  
  return (
    <div
      className="d-flex flex-column py-3 px-4 align-items-center justify-content-center"
      style={{
        cursor: "pointer",
        transition: ".5s ease all",
        maxWidth: 200,
        transform: "translateX(-1px)",
        zIndex: 400,
        borderBottomRightRadius: 8
      }}
      onClick={()=>disp({
        type: "POSTS_OVERLAY",
          id,
          overlay: 
            <LargeContainer
              style={{
                background: "#17191b",
                borderRadius: 12,
                padding: 20,
                color: colors.white,
                width: "75%",
                boxShadow: "0px 0px 20px 1px black"
              }}
              type="v"
            >
              {
                OverlayData({
                  followsOwner: followedByViewer,
                  ownerFavorite: true
                })[isOwner ? "owner" : "other"].map((a,i)=>
                  <OverlayRow
                    key={i}
                    {...a}
                  />
                )
              }
              {/* <OverlayRow
                isActive={true}
                color={{
                  color_active: colors.red,
                  color_inactive: colors.gray
                }}
                text={{
                  text_active: "Unfollow",
                  text_inactive: "Follow"
                }}
                img={{
                  img_active: "/images/post/topbar/following_active.svg",
                  img_inactive: "/images/post/topbar/following_inactive.svg"
                }}
                className="my-2"
              />
              <OverlayRow
                isActive={true}
                color={{
                  color_active: colors.red,
                  color_inactive: colors.gray
                }}
                text={{
                  text_active: "Unfollow",
                  text_inactive: "Follow"
                }}
                img={{
                  img_active: "/images/post/topbar/following_active.svg",
                  img_inactive: "/images/post/topbar/following_inactive.svg"
                }}
              /> */}
            </LargeContainer>
      })}
    >
      <div
        //picture
        style={{
          minWidth: 60,
          minHeight: 60,
          borderRadius: "50%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(${picture})`,
        }}
      />
      <div
        //name
        className="d-flex flex-column align-items-center"
        style={{
          color: colors.white,
          maxWidth: 138,
          transition: ".4s ease all",
          marginTop: 5
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: 13,
            maxWidth: 110,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontWeight: "lighter",
            fontSize: 12,
            maxWidth: 110,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          @{username}
        </div>
      </div>
    </div>
  );
};
