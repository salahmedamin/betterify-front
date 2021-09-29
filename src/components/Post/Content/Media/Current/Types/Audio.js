import WaveSurfer from "wavesurfer.js";
import { useEffect, useState } from "react";
import { colors } from "../../../../../../colors";
import { Loading } from "../../../../../../Loading";
import { getTimeFromSeconds } from "../../../../../functions/getTimeFromSeconds";

export const Audio = ({ current, index, total, duration }) => {
  const [isPlaying, setisPlaying] = useState(() => false);
  const [time, settime] = useState(getTimeFromSeconds(0));
  const [isLoading, setisLoading] = useState(true);

  //   const [play, setplay] = useState(undefined)
  //   const [pause, setpause] = useState(undefined)
  //   const [stop, setstop] = useState(undefined)
  useEffect(() => {
      const wavesurfer = WaveSurfer.create({
        container: "#waveform",
        waveColor: colors.gray,
        progressColor: colors.whiteBlue,
      });
      wavesurfer.load(`http://localhost:5000/media/${current}`)
      wavesurfer.on("ready", () => {
        document
          .querySelector("#waveform_play")
          .addEventListener("click", () => wavesurfer.play())
        document
          .querySelector("#waveform_pause")
          .addEventListener("click", () =>wavesurfer.pause())
        document
        .querySelector("#waveform_stop")
        .addEventListener("click", () =>wavesurfer.stop())
        // setstop(() => wavesurfer.stop)
        settime(getTimeFromSeconds(wavesurfer.getCurrentTime()))
        setisPlaying(wavesurfer.isPlaying());
        setisLoading(false)
      })
      wavesurfer.on('audioprocess',()=>settime(getTimeFromSeconds(wavesurfer.getCurrentTime())))
      wavesurfer.on('finish',()=>setisPlaying(false))
    return ()=>{
      wavesurfer.stop()
      settime(getTimeFromSeconds(0))
    }
  }, [current])

  return (
    <div
      style={{
        width: "50%",
        height: "100%",
        position: "relative",
        display: "grid",
        alignItems: "center",
      }}
    >
        {
            isLoading ?
                <Loading
                    style={{
                        position:"absolute",
                        top: "50%",
                        left: "50%",
                        transform: 'translate(-50%,-50%)',
                        width: "100%",
                        height:"100%",
                        zIndex: 10,
                        backdropFilter: "blur(4px)"
                    }}
                    spinnerColor={colors.white}
                />
            : null
        }

      <div
        style={{
          left: "50%",
          bottom: "10%",
          transform: "translateX(-50%)",
        }}
        className="d-flex align-items-center justify-content-center position-absolute"
      >
          
        <div
          style={{
            height: 30,
            width: 30,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(/images/post/content/stop_audio.svg)`,
            cursor: "pointer",
            marginRight: 10,
            marginTop: 5,
          }}
          id={"waveform_stop"}
          onClick={
              () => {
                  settime(getTimeFromSeconds(0))
                  setisPlaying(false)
              }
            }
        />
        <div
          style={{
            height: 30,
            width: 30,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(/images/post/content/play_audio.svg)`,
            cursor: "pointer",
            marginRight: 10,
            marginTop: 5,
            display: !isPlaying ? "inline-block" : "none",
          }}
          id={"waveform_play"}
          onClick={() => setisPlaying(true)}
        />

        <div
          style={{
            height: 30,
            width: 30,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(/images/post/content/pause_audio.svg)`,
            cursor: "pointer",
            marginRight: 10,
            marginTop: 5,
            display: isPlaying ? "inline-block" : "none",
          }}
          id={"waveform_pause"}
          onClick={() => setisPlaying(false)}
        />

        <div style={{ color: colors.white }}>
              {
                time.hours > 0 ? time.hours+":":null
              }{
                time.minutes + ":" + time.seconds
              }/{
                duration.hours > 0 ? duration.hours+":":null
              }{
                duration.minutes + ":" + duration.seconds
              }</div>
      </div>

      <div
        id="waveform"
        style={{
          width: "100%",
          height: "60%",
          paddingTop: "8%",
        }}
      />
    </div>
  );
};
