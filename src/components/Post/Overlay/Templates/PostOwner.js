import { colors } from "../../../../colors"
import LargeContainer from "../../../generalComps/LargeContainer"
import { OverlayData } from "../../Topbar/OverlayData"
import OverlayRow from "../OverlayRow"

export const PostOwnerOverlay = ({id})=>{
    return <LargeContainer
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
        followsOwner: false,
        ownerFavorite: false
      }).owner.map((a,i)=>
        <OverlayRow
          key={i}
          {...a}
        />
      )
    }
  </LargeContainer>
}