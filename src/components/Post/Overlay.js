import React from 'react'

export default function Overlay({ children, className, style}) {
    return (
        <div
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
                backdropFilter: "blur(3px)",
                ...style
            }}
            className={"col-12 col-md-8 col-lg-6 "+(className||'')}
        >
            {
                children
            }
        </div>
    )
}
