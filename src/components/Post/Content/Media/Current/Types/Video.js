import { VideoPlayer } from "../../../../../generalComps/VideoPlayer"

export const Video = ({ list, duration, postWidth, setpostWidth, id }) => {
return <VideoPlayer
        maxWidth={postWidth < 690 ? 425 : 648}
        minWidth={350}
        list={list}
        _duration={duration}
        postWidth={postWidth}
        setpostWidth={setpostWidth}
        id={id}
      />
};
