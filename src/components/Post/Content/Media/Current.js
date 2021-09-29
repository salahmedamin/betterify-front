import { Video } from "./Current/Types/Video";
import { Arrow } from "./Current/Arrow";
import { Audio } from "./Current/Types/Audio";
import { File } from "./Current/Types/File";
import { Image } from "./Current/Types/Image";
import { getTimeFromSeconds } from "../../../functions/getTimeFromSeconds";
import { useEffect } from "react";
import Divider from "../../../generalComps/Divider";

export const Current = ({
  current,
  total,
  currentIndex,
  previous,
  next,
  postWidth,
  setpostWidth,
}) => {
  useEffect(() => {
    if (current?.type !== "video") setpostWidth(undefined)
  }, [current?.type, setpostWidth]);
  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        overflow: "hidden",
        background: ["image"].includes(current?.type)
          ? "rgb(0,0,0,0.3)"
          : undefined,
      }}
      className="d-flex flex-column align-items-center justify-content-center position-relative pt-2"
    >
      <Divider
        showCondition={["image","video"].includes(current?.type)}
        width={"95%"}
        height={1}
      />
      {current?.type === "image" ? (
        <Image current={current?.unique} total={total} index={currentIndex} />
      ) : current?.type === "audio" ? (
        <Audio
          duration={getTimeFromSeconds(current?.duration)}
          current={current?.unique}
          index={currentIndex}
          total={total}
        />
      ) : current?.type === "file" ? (
        <File
          index={currentIndex}
          total={total}
          size={current.size}
          name={current.name}
        />
      ) : current?.type === "video" ? (
        <Video
          postWidth={postWidth}
          setpostWidth={setpostWidth}
          duration={current?.duration}
          list={current?.video_qualities}
          total={total}
          index={currentIndex}
        />
      ) : null}

      {/* arrows */}
      {currentIndex > 0 ? <Arrow left={true} onClick={previous} /> : null}
      {currentIndex + 1 < total ? <Arrow onClick={next} /> : null}

      {["image"].includes(current?.type) ? (
        <div
          style={{
            position: "absolute",
            zIndex: -3,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundImage: `url(http://localhost:5000/media/${current.unique})`,
            filter: "blur(8px)",
            width: "100%",
            height: "100%",
            transition: ".4s ease all",
          }}
        />
      ) : null}
    </div>
  );
};
