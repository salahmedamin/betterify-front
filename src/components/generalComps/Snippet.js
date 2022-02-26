import React, { Children, useState } from 'react'
// import useLongPress from '../../hooks/useLongPress'
import { useLongPress } from 'use-long-press';
import Tooltip from './Tooltip'

export default function Snippet({
    color,
    text,
    style,
    bgColor,
    cb,
    useHook=true,
    longPressCb,
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
    // const longPressEvent  = useLongPress(
    //   !useHook ? undefined : typeof longPressCb === "function" ? longPressCb : ()=>undefined,
    //   !useHook ? undefined : typeof cb === "function" ? cb : ()=>undefined,
    //   {
    //     delay: 300,
    //     shouldPreventDefault: true
    //   }
    // )
    const longPressEvent = useLongPress(typeof longPressCb === "function" ? longPressCb : ()=>undefined,{
      cancelOnMovement: true,
    })
    return (
        <div
        {
          ...longPressEvent
        }
        onClick={typeof cb === "function" ? cb : ()=>undefined}
        key={1}
        onMouseOver={()=>sethover(true)}
        onMouseOut={()=>sethover(false)}
        style={{
          background: bgColor,
          paddingTop:3,
          paddingBottom:3,
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
            key={2}
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
              key={3}
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
