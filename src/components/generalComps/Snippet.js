import React, { Children, useState } from 'react'
import Tooltip from './Tooltip'

export default function Snippet({
    color,
    text,
    style,
    bgColor,
    cb,
    custom,
    image:{
      path,
      width,
      height,
      imgStyle
    } = {},
    tooltip:{
      value,
      left,
      right,
      bottom,
      top,
      tooltip_style
    }={}
}) {
    const [hover, sethover] = useState(false)
    return (
        <div
        onClick={cb}
        onMouseOver={()=>sethover(true)}
        onMouseOut={()=>sethover(false)}
        style={{
          background: bgColor,
          paddingTop:6,
          paddingBottom:6,
          paddingLeft:8,
          paddingRight:8,
          color,
          borderRadius: 3,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          ...style
        }}
      >
        {
          value ?
          <Tooltip
            bottom={bottom}
            top={top}
            left={left}
            right={right}
            style={tooltip_style}
            text={value}
            showCondition={hover}
          >
            {Children}
          </Tooltip>
          :
          null
        }
        {
          path && width && height ?
            <div
              style={{
                width,
                height,
                backgroundRepeat: "no-repeat",
                backgroundPosition:"center center",
                backgroundImage: `url(${path})`,
                backgroundSize: "contain",
                display: "inline-block",
                marginRight: 10,
                ...imgStyle
              }}
            />
          : null
        }
        {text} {custom}
      </div>
    )
}
