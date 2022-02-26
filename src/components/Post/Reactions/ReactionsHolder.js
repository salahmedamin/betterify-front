import React, { useRef } from 'react'
import { reactions } from './reactions_list'
import Reaction from './Reaction'
import { useOnClickOutside } from '../../../hooks/useOnClickOutside'
import { setShowReactions } from '../../../dispatches/posts/setShowReactions'

export const ReactionsHolder = ({id, own}) => {
  const ref = useRef(null)
  useOnClickOutside(ref, ()=>setShowReactions({
    value: false,
    id: id
  }))
  
    return (
        <div
            ref={ref}
            style={{
              marginTop: 30,
              width: "100%",
              display: "flex",
              alignItems:"center",
              justifyContent:"space-evenly"
            }}
          >
              {
                  reactions.map((a,i)=>
                    <Reaction
                        key={i}
                        name={a}
                        id={id}
                        isSelected={own?.toLowerCase() === a.toLowerCase()}
                    />
                  )
              }
          </div>
    )
}
