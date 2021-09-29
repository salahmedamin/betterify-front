import React, { useEffect, useState } from "react";

function requestFullScreen(element) {
    // Supports most browsers and their versions.
    const requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

    if (requestMethod) { // Native full screen.
        requestMethod.call(element)
    } else if (typeof window.ActiveXObject !== "undefined") {
        const wscript = new window.ActiveXObject("WScript.Shell");
        if (wscript !== null) {
            wscript.SendKeys("{F11}");
        }
    }
}
const exitFS = ()=>{
    if (document.exitFullScreen) return document.exitFullScreen();
    else if (document.webkitExitFullscreen) return document.webkitExitFullscreen();
    else if (document.msExitFullscreen) return document.msExitFullscreen();
    else if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
}
const FullScreen = (props,ref)=>{
    const [fullscreen, setfullscreen] = useState(false)
    useEffect(() => {
        setfullscreen((window.fullScreen) || (window.innerWidth === window.screen.width && window.innerHeight === window.screen.height))
    }, [window.fullScreen, window.innerWidth,window.screen.width,window.innerHeight,window.screen.height])
    return (
        <div
            style={{position:"relative", height: "100%", width: 20, marginLeft: 10}}
        >
            <div
                style={{
                    backgroundSize: "15px 15px",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundImage:`url(/images/post/content/fullScreen${fullscreen ? "Out" : "On"}.svg)`,
                    height: "100%",
                    width: 20,
                    cursor:"pointer",
                }}
                onClick={()=> !fullscreen ? requestFullScreen(ref) : exitFS() }
            />
        </div>
    )
}

export default React.forwardRef(FullScreen)
