import React from 'react'

export default function SpeedUp({style, onDblClick}) {
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                width: "30%",
                ...style
            }}
            onDoubleClick={onDblClick}
        />
    )
}
