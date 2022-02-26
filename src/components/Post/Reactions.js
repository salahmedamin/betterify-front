import React from 'react'
import Overlay from './Overlay'
import { ReactionsHolder } from './Reactions/ReactionsHolder'

export const Reactions = ({id, own}) => {
    return (
        <Overlay
          style={{
            alignItems:"flex-start",
            paddingTop: 30
          }}
        >
          <ReactionsHolder id={id} own={own}/>
        </Overlay>
    )
}
