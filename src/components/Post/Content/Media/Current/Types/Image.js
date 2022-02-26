import React, { useEffect, useState } from 'react'
import { colors } from '../../../../../../colors'


export const Image = ({unique, doubtedContent, faces, style, isGif, width, height, className}) => {
    const hasFaces = Array.isArray(faces) && faces.length > 0
    const [showFaces, setshowFaces] = useState(false)
    const [showAlert, setshowAlert] = useState(doubtedContent.length>0)
    const [factor, setfactor] = useState(undefined)
    const [customWidth, setcustomWidth] = useState(undefined)

    useEffect(() => {
        setfactor(window.innerWidth < width ? window.innerWidth/width : undefined)
        const listen = ()=>setfactor(window.innerWidth < width ? window.innerWidth/width : undefined)
        window.addEventListener("resize", listen)
        return ()=>window.removeEventListener("resize", listen)
    }, [width])

    useEffect(() => {
        if(factor !== undefined) setcustomWidth(width*factor)
    }, [factor, width])
    return (
        <div
          style={{
            position: "absolute",
            ...style,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(${!isGif ? "http://localhost:5000/api/media/" : ""}${unique})`,
            width: !isGif ? "100%" : width,
            height: !isGif ? "100%" : height,
            transition: ".4s ease all",
            overflow:"hidden",
            maxWidth: customWidth||width
          }}
          className={className}
          onClick={()=>setshowFaces(!showFaces)}
        >
            {
                showAlert ?
                <div
                    style={{
                        width: "200%",
                        height:"200%",
                        position:"absolute",
                        zIndex:200,
                        top: "50%",
                        left:"50%",
                        transform:"translate(-50%,-50%)",
                        backdropFilter:"blur(10px)",
                        cursor:"pointer"
                    }}
                    onClick={()=>setshowAlert(false)}
                />
                :null
            }
            {
                isGif ? 
                <div
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        padding: 10,
                        fontSize: 12,
                        borderRadius: 50,
                        border: "3px solid "+colors.white,
                        backdropFilter: "blur(5px)",
                        fontFamily:"fantasy",
                        letterSpacing: 1,
                        cursor: "default"
                    }}
                >
                    GIF
                </div>
                :null
            }
            {
                hasFaces ? 
                <div
                    style={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        padding: 15,
                        backgroundImage: "url(/images/post/content/user_icon.svg)",
                        backgroundSize: "60% 60%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "60% center",
                        backgroundColor: colors.black,
                        borderRadius: "50%",
                        cursor: "pointer"
                    }}
                />
                :null
            }
            {
                hasFaces ?
                    faces.map((a,i)=>
                        <div
                            key={i}
                            style={{
                                ...a, 
                                position:"absolute",
                                username: undefined,
                                cursor: "pointer",
                                // border: `2px solid ${colors.black}`,
                                visibility: showFaces ? "visible" : "hidden",
                                opacity: showFaces ? 1 : 0,
                                transition: ".3s ease all"
                            }}
                        >
                            <div
                                style={{
                                    position: "absolute",
                                    top: "100%",
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    color: colors.white,
                                    textAlign: "center",
                                    background:colors.black,
                                    marginTop: 7.5,
                                    fontSize: 14
                                }}
                                className="px-2 py-1 rounded"
                            >
                                <div
                                    style={{
                                        width: 0, 
                                        height: 0, 
                                        borderLeft: "5px solid transparent",
                                        borderRight: "5px solid transparent",
                                        borderBottom: "5px solid black",
                                        position: "absolute",
                                        bottom: "100%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                    }}
                                />
                                {a.username}
                            </div>
                        </div>
                    )
                : null
            }
        </div>
    )
}
