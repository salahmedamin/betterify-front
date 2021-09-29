import React, { useRef, useState } from 'react'
import { colors } from '../../../colors';
import { getTimeFromSeconds } from '../../functions/getTimeFromSeconds';

export default function PlayRange({duration, onClick, timing}) {
    const rangePlayer = useRef()
    const [hoverplayrange, sethoverplayrange] = useState(false)
    const [showPlayRangeTime, setshowPlayRangeTime] = useState(false)
    const [timeFromPlayRange, settimeFromPlayRange] = useState({
        timing: getTimeFromSeconds(0),
        percentage: 0
    })
    return (
        <div
        style={{
          width: "calc( 100% - 140px )",
          height: !hoverplayrange ? 8 : 12,
          transition: ".1s ease all",
          cursor: "pointer",
          background: colors.gray+"80",
          border: `1px solid ${colors.gray}`,
          borderRadius: 5,
          position: "relative",
          marginRight: 15
        }}
        ref={rangePlayer}
        onMouseMove={(e) => {
          const { x, width } = rangePlayer.current.getBoundingClientRect();
          const inRangeWidth = e.clientX - x
          const percentage = (inRangeWidth * 100) / width;
          const timing = getTimeFromSeconds(
            (percentage * duration.raw) / 100
          );
          settimeFromPlayRange({
              timing, percentage: inRangeWidth-18
          });
          sethoverplayrange(true);
          setshowPlayRangeTime(true);
        }}
        onMouseOut={() => {
          sethoverplayrange(false);
          setshowPlayRangeTime(false);
        }}
        onClick={()=>onClick(timeFromPlayRange.timing.raw)}
      >
        {showPlayRangeTime ? (
          <div
            style={{
              padding: 5,
              color: colors.white,
              background: colors.gray,
              position: "absolute",
              bottom: `calc( 100% + 5px )`,
              left: timeFromPlayRange.percentage,
              fontSize: 11,
              borderRadius: 4
            }}
          >
            {timeFromPlayRange.timing.hours > 0 ? timeFromPlayRange.timing.hours+":":null}{timeFromPlayRange.timing.minutes+":"+timeFromPlayRange.timing.seconds}
          </div>
        ) : null}
        <div
          style={{
            backgroundColor: "white",
            height: "100%",
            width: (timing.raw * 100) / duration?.raw + "%" || 0,
            borderRadius: 5,
          }}
        />
      </div>
    )
}
