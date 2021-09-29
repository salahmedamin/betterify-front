import { useEffect, useRef, useState } from "react"
import PlayRange from "./VideoPlayer/PlayRange"
import SwitchPlay from "./VideoPlayer/SwitchPlay"
import Timing from "./VideoPlayer/Timing"
import Volume from "./VideoPlayer/Volume"
import SpeedUp from "./VideoPlayer/SpeedUp"
import FullScreen from "./VideoPlayer/FullScreen"
import Quality from "./VideoPlayer/Quality"

import { Loading } from "../../Loading"
import { getTimeFromSeconds } from "../functions/getTimeFromSeconds"
import { colors } from "../../colors"

export const VideoPlayer = ({
    _duration,
    list,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    setpostWidth,
    postWidth
})=>{
    const [loading, setloading] = useState(true)
    const [playing, setplaying] = useState(false)
    const [timing, settiming] = useState(getTimeFromSeconds(0))
    const [duration, setduration] = useState(getTimeFromSeconds(_duration))
    const [currentTime, setcurrentTime] = useState(0)
    const [current, setcurrent] = useState(0)
    const [volume, setvolume] = useState(0)
    const [showplayrange, setshowplayrange] = useState(false)
    const [showQualities, setshowQualities] = useState(false)
    const fullScreenRef = useRef()
    const ref = useRef()


    useEffect(() => {
        //first load
        setduration(getTimeFromSeconds(_duration))
        ref?.current?.addEventListener("loadeddata", () => {
          setloading(ref?.current?.readyState < 3)
          if(setpostWidth) setpostWidth(ref?.current?.getBoundingClientRect()?.width)
        })
    
        //playing / pausing
        ref?.current?.addEventListener("play", () => setplaying(true))
        ref?.current?.addEventListener("pause", () => setplaying(false))
    
        //time update
        ref?.current?.addEventListener("timeupdate", () => settiming(getTimeFromSeconds(ref?.current?.currentTime)))
        } ,[ref, loading, _duration, setpostWidth])
    
      useEffect(() => ref.current.currentTime = currentTime, [currentTime])
      useEffect(() => ref.current.volume = volume/100, [volume])
      useEffect(() =>{
          setloading(true)
          ref.current.load()
          setplaying(false)
      } , [current])

    return(
        <div
      style={{
        height: "100%",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseOver={()=>setshowplayrange(true)}
      onMouseOut={()=>setshowplayrange(false)}
    >


      {loading ? (
        <Loading
          spinnerColor={colors.gray}
          spinnerStyle={{
            width: 100,
            height: 100,
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 5,
            borderRadius: "50%",
          }}
        />
      ) : null}


      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          minWidth: minWidth||450,
          minHeight: minHeight||240,
          maxWidth,
          maxHeight,
        }}
        ref={fullScreenRef}
      >
        <Timing duration={duration} timing={timing} />
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 2,
            cursor: "pointer"
          }}
          onClick={()=>window.innerWidth > 690 ? (playing ? ref.current.pause() : ref.current.play()):null}
        >
            <SpeedUp style={{left:0}} onDblClick={()=>timing.raw-10 > 0 ? ref.current.currentTime = timing.raw-10 : null} />
            <SpeedUp style={{right:0}} onDblClick={()=>timing.raw+10 <= duration.raw ? ref.current.currentTime = timing.raw+10 : null} />
        </div>
        <video
            ref={ref}
            style={{
              maxWidth: window.innerWidth < 690 ? "100%" : undefined
            }}
        >
            <source
              src={`http://localhost:5000/media/${list[current]?.videoHash}?type=video`}
            />
        </video>

        <div
          className="hidescrollbar"
          style={{
            position: "absolute",
            top: showplayrange || showQualities ? `calc( 100% - ${window.innerWidth >= 690 ? "33" : "45"}px )`:'calc( 100% - 0px )',
            transition: ".3s ease all",
            width: "100%",
            height: "33px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            zIndex: 3,
            paddingLeft: 15,
            maxWidth: "100%",
          }}
        >
            <SwitchPlay pause={()=>ref?.current?.pause()} play={()=>ref?.current?.play()} playing={playing} loading={loading} />
            <PlayRange duration={duration} onClick={(e)=>setcurrentTime(e)} timing={timing} />
            <Volume volume={volume} setvolume={setvolume}/>
            <Quality showQualities={showQualities} setshowQualities={setshowQualities} current={current} setcurrent={setcurrent} list={list} />
            <FullScreen ref={fullScreenRef.current} />
        </div>
      </div>
    </div>
    )
}