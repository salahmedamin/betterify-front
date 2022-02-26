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
    setpostWidth,
    urls
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
            urls={urls}
        />
        {
            medias?.length > 0 ?
                <Media medias={medias} postWidth={postWidth} setpostWidth={()=>setpostWidth?setpostWidth():undefined} />
            : null
        }
    </div>
)