import { useState } from "react";
import Tooltip from "../../../../generalComps/Tooltip"

export const OnTop = ({style,children,tooltip})=>{
    const [hover, sethover] = useState(false);
    return (
        <div
            onMouseOver={()=>sethover(true)}
            onMouseOut={()=>sethover(false)}
            style={{
                position:"absolute",
                minWidth: 50,
                minHeight: 33,
                backgroundColor:"rgb(0,0,0,.47)",
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                color:"white",
                ...style
            }}
        >
            {
                tooltip ? <Tooltip {...tooltip} showCondition={hover} /> : null
            }
            {
                children
            }
        </div>
    )
}