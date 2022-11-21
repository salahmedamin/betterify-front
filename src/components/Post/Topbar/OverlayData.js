import { noHooksColors } from "../../../colors";

const noHookColor = noHooksColors();
export const OverlayData = ({ followsOwner, ownerFavorite }) => ({
  owner: [
    {
      //privacy
      text: {
        text_default: "Privacy",
      },
      img: {
        img_default: "/images/post/topbar/privacy.svg",
      },
      color: {
        color_default: noHookColor.white,
      },
    },
    {
      //edit
      text: {
        text_default: "Edit",
      },
      img: {
        img_default: "/images/post/topbar/edit.svg",
      },
      color: {
        color_default: noHookColor.white,
      },
    },
    {
      //delete
      text: {
        text_default: "Delete",
      },
      img: {
        img_default: "/images/post/topbar/delete.svg",
      },
      color: {
        color_default: noHookColor.white,
      },
      onHoverBg: noHookColor.red + "80",
    },
  ],
  other: [
    {
      //favorite
      isActive: ownerFavorite,
      text: {
        text_active: "Favorite",
        text_inactive: "Mark as favorite",
      },
      img: {
        img_inactive: "/images/post/topbar/favorite_inactive.svg",
        img_active: "/images/post/topbar/favorite_active.svg",
      },
      color: {
        color_active: noHookColor.yellow,
        color_inactive: noHookColor.white,
      },
    },
    {
      //follow
      isActive: followsOwner,
      text: {
        text_active: "Unfollow",
        text_inactive: "Follow",
      },
      img: {
        img_active: "/images/post/topbar/following_active.svg",
        img_inactive: "/images/post/topbar/following_inactive.svg",
      },
      color: {
        color_active: noHookColor.red + "80",
        color_inactive: noHookColor.white,
      },
    },
    {
      //report
      text: {
        text_default: "Report",
      },
      img: {
        img_default: "/images/post/topbar/report.svg",
      },
      color: {
        color_default: noHookColor.white,
      },
      onHoverBg: noHookColor.red + "80",
    },
    //similar
  ],
  default: [
    //bug
  ],
});
