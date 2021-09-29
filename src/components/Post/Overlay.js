import React, { useRef } from 'react'

export default function Overlay({ id, children, className}) {
    const ref = useRef()
    return (
        <div
            ref={ref}
            style={{
                position:"absolute",
                width: "100%",
                height:"100%",
                top: 0,
                left:0,
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                zIndex: 500,
                backdropFilter: "blur(3px)"
            }}
            className={"col-12 col-md-8 col-lg-6 "+(className||'')}
        >
            {
                children
            }
        </div>
    )
}
