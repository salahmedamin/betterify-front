import { VideoPlayer } from "../../../../../generalComps/VideoPlayer"

export const Video = ({ list, duration, postWidth, setpostWidth }) => {
return <VideoPlayer
        maxWidth={postWidth < 690 ? 380 : 648}
        minWidth={350}
        list={list}
        _duration={duration}
        postWidth={postWidth}
        setpostWidth={setpostWidth}
      />
};
