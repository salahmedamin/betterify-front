import { useState } from "react";
import { colors } from "../../../colors";
import { All } from "./Media/All";
import { Current } from "./Media/Current";

export const Media = ({ medias, postWidth, setpostWidth }) => {
  const [current, setcurrent] = useState(0)
  const [expandOptions, setexpandOptions] = useState(false)
  return (
    <div
      style={{
        maxWidth: "100%",
        height: medias[current]?.type === "video" ? undefined : "60vh",
      }}
      className="mt-3 d-flex flex-column align-items-center position-relative"
    >
      <div
      //to react to media, download or report
        style={{
          position:"absolute",
          right: 10,
          top: 20,
          border: "1px solid "+colors.gray,
          color: colors.white,
          borderRadius: "50%",
          cursor: "pointer",
          backgroundSize: "15px 15px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundImage: `url(/images/post/content/more_${expandOptions ? "active":"inactive"}.svg)`,
          backgroundColor: expandOptions ? undefined : colors.gray,
          transition: ".3s ease all",
          zIndex: 10
        }}
        onClick={()=>setexpandOptions(!expandOptions)}
        className="px-3 py-3"
      />
      <Current
        current={medias?.length > 0 ? medias[current] : undefined}
        currentIndex={current}
        total={medias.length}
        reacts={800}
        previous={()=>current > 0 ? setcurrent(current-1) : null}
        next={()=>current < medias.length-1 ? setcurrent(current+1) : null}
        postWidth={postWidth}
        setpostWidth={setpostWidth}
      />
      <All current={current} onClick={(i) => setcurrent(i)} medias={medias} />
    </div>
  );
};
