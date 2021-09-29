import React from "react"
import { colors } from "../../../../colors"
import Snippet from "../../../generalComps/Snippet"

export const convertTextWithTags = (text,tags)=>{
  let splitText = text.split(" ")
  
  tags
  .forEach((a,i)=>
    splitText[a.tagOffset] = 
      <Snippet
        bgColor={colors.gray+"80"}
        color={colors.white}
        text={"@"+a.tagged?.username}
        cb={()=>undefined}
        style={{
          display:"inline-block", 
          paddingTop: 4, 
          paddingBottom: 4,
          paddingLeft: 9,
          paddingRight: 9,
          margin: 3,
          fontSize: 14
        }}
      />
  )
  return splitText.map(a=>typeof a === "string" ? a+" " : a)
}
