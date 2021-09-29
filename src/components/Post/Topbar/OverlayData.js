import { colors } from "../../../colors";

export const OverlayData = ({
    followsOwner,
    ownerFavorite,
})=>({
    owner: [
      {
        //privacy
        text:{
          text_default: "Privacy",
        },
        img:{
          img_default: "/images/post/topbar/privacy.svg"
        },
        color: {
          color_default: colors.white
        }
      },
      {
        //edit
        text:{
          text_default: "Edit",
        },
        img:{
          img_default: "/images/post/topbar/edit.svg"
        },
        color: {
          color_default: colors.white
        }
      },
      {
        //delete
        text:{
          text_default: "Delete",
        },
        img:{
          img_default: "/images/post/topbar/delete.svg"
        },
        color: {
          color_default: colors.white
        },
        style:{
            background: colors.red+"60"
        }
      }
    ],
    other: [
      {
        //favorite
        isActive: ownerFavorite,
         text:{
          text_active: "Favorite",
          text_inactive: "Mark as favorite",
        },
        img:{
          img_inactive: "/images/post/topbar/favorite_inactive.svg",
          img_active: "/images/post/topbar/favorite_active.svg",
        },
        color: {
          color_active: colors.yellow,
          color_inactive: colors.white
        },
      },
      {
        //follow
        isActive: followsOwner,
        text:{
          text_active: "Unfollow",
          text_inactive: "Follow",
        },
        img:{
          img_active: "/images/post/topbar/following_active.svg",
          img_inactive: "/images/post/topbar/following_inactive.svg",
        },
        color: {
          color_active: colors.red,
          color_inactive: colors.white
        },
      },
      {
        //report
        text:{
          text_default: "Report"
        },
        img:{
          img_default: "/images/post/topbar/report.svg"
        },
        color: {
          color_default: colors.white,
        },
        style:{
            background: colors.red+"60"
        }
      }
      //similar
    ],
    default:[
      //bug
    ]
  })