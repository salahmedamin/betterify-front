import { Text } from "./Content/Text"
import { Media } from "./Content/Media"

export const Content = ({
    text,
    tagged,
    medias,
    isOwner,
    hasEdits,
    activity,
    place,
    postWidth,
    setpostWidth
})=>(
    <div
        className="d-flex flex-column mt-4"
    >
        <Text
            text={text}
            tagged={tagged}
            isOwner={isOwner}
            hasEdits={hasEdits}
            activity={activity}
            place={place}
            hasMedia={medias?.length > 0}
            postWidth={postWidth}
        />
        {
            medias?.length > 0 ?
                <Media medias={medias} postWidth={postWidth} setpostWidth={setpostWidth} />
            : null
        }
    </div>
)