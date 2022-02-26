import React, { useRef, useState } from "react";
import { colors } from "../../../colors";
import { EnlargeOnEvent } from "../EnlargeOnEvent";

function LeftSide({ setfiles, add, replace, style }) {
  const ref1 = useRef();
  const ref2 = useRef();

  const input = useRef();

  const setAcceptedFormat = (formats)=>{
    const ref = input?.current
    ref.accept = Array.isArray(formats) ? formats : undefined
  }

  const [expandLeft, setexpandLeft] = useState(false)

  return (
    <EnlargeOnEvent
      useOnWidth={true}
      event={{ click: true }}
      ref={{
        ref1,
        ref2,
      }}
      shrinkOnClickOutside={true}
      allowOverflowOnEnlarge={expandLeft}
      style={{
        cursor: "pointer",
        transition: ".05s ease all",
        minwWidth: 35,
        ...style
      }}
      setvalue={setexpandLeft}
      value={expandLeft}
    >
      <input
        ref={input}
        type="file"
        multiple={add}
        style={{
          display: "none",
        }}
      />
      <div
        ref={ref1}
        style={{
          transition: ".4s ease all",
          background: expandLeft ? colors.gray + "80" : undefined,
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "fit-content",
        }}
      >
        <div
          style={{
            width: 35,
            height: 35,
            backgroundColor: !expandLeft ? colors.gray + "80" : undefined,
            borderRadius: "50%",
            backgroundImage: "url(/images/general/plus_white.svg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "30px 35px",
            transition: ".4s ease all",
            transform: `rotate(${expandLeft ? "45" : "0"}deg)`,
          }}
          ref={ref2}
        />
        {[
          {
            img: "audio",
            formats: [".mp3",".m4a",".wav"],
            style: {
              backgroundSize: 10,
            },
          },
          {
            img:"file",
          },
          {
            img: "gif",
            onClick: ()=>undefined,
            style: {
              backgroundSize: 35,
            },
          },
        ].map((a, i) => (
          <div
            key={i}
            style={{
              width: 50,
              height: 50,
              backgroundImage: `url(/images/general/${a.img}_white.svg)`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: 15,
              ...a.style
            }}
            onClick={()=>{
                setAcceptedFormat(a.formats)
                if(a.onClick) a.onClick()
            }}
          />
        ))}
      </div>
    </EnlargeOnEvent>
  );
}

export default LeftSide;
