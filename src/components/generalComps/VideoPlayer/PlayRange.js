import React, { /*useEffect,*/ useRef, useState } from "react";
import { useColors } from "../../../colors";
import { getTimeFromSeconds } from "../../functions/getTimeFromSeconds";

// const updateCanvas = (ctx,video) => {
//   ctx.drawImage(video, 0, 0, 40, 60)
//   video.requestVideoFrameCallback(updateCanvas);
// };

export default React.forwardRef(({ duration, onClick, timing }, ref) => {
  // const canvasRef = useRef()
  const rangePlayer = useRef();
  const [hoverplayrange, sethoverplayrange] = useState(false);
  const [showPlayRangeTime, setshowPlayRangeTime] = useState(false);
  const [timeFromPlayRange, settimeFromPlayRange] = useState({
    timing: getTimeFromSeconds(0),
    percentage: 0,
  });

  // useEffect(() => {
  //   if(showPlayRangeTime){
  //     if (!ref.current.ended && !ref.current.paused) ref.current.requestVideoFrameCallback(()=>updateCanvas(canvasRef.current, ref.current))
  //   }
  // }, [showPlayRangeTime, ref, timeFromPlayRange])
  const colors = useColors();
  return (
    <div
      style={{
        width: "calc( 100% - 140px )",
        height: !hoverplayrange ? 8 : 12,
        transition: ".1s ease all",
        cursor: "pointer",
        // background: colors.gray+"80",
        // border: `1px solid ${colors.gray}`,
        borderRadius: 5,
        position: "relative",
        marginRight: 15,
      }}
      ref={rangePlayer}
      onMouseMove={(e) => {
        const { x, width } = rangePlayer.current.getBoundingClientRect();
        const inRangeWidth = e.clientX - x;
        const percentage = (inRangeWidth * 100) / width;
        const timing = getTimeFromSeconds((percentage * duration.raw) / 100);
        settimeFromPlayRange({
          timing,
          percentage: inRangeWidth - 18,
        });
        sethoverplayrange(true);
        setshowPlayRangeTime(true);
      }}
      onMouseOut={() => {
        sethoverplayrange(false);
        setshowPlayRangeTime(false);
      }}
      onClick={() => onClick(timeFromPlayRange.timing.raw)}
    >
      <div
        style={{
          width: "100%",
          height: 4,
          background: colors.gray,
          position: "absolute",
          top: "50%",
          borderRadius: 5,
          transform: "translateY(-50%)",
        }}
      />
      {showPlayRangeTime ? (
        <div
          style={{
            padding: 5,
            color: "white",
            background: colors.gray,
            position: "absolute",
            bottom: `calc( 100% + 5px )`,
            left: timeFromPlayRange.percentage,
            fontSize: 11,
            borderRadius: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <div
              className="mb-1 border border-light"
            >
              <canvas
                ref={canvasRef}
                style={{
                  maxWidth: 60,
                  maxHeight: 120
                }}
              />
            </div> */}
          <div style={{ textAlign: "center" }}>
            {timeFromPlayRange.timing.hours > 0
              ? timeFromPlayRange.timing.hours + ":"
              : null}
            {timeFromPlayRange.timing.minutes +
              ":" +
              timeFromPlayRange.timing.seconds}
          </div>
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "white",
          height: "60%",
          width: (timing.raw * 100) / duration?.raw + "%" || 0,
          borderRadius: 5,
        }}
      />
    </div>
  );
});
