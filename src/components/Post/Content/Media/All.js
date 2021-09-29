import {HorizontalScroll} from "../../../generalComps/HorizontalScroll";
import { Audio } from "./All/Audio";
import { File } from "./All/File";
import { Image } from "./All/Image";
import { Video } from "./All/Video";

export const All = ({
    onClick,
    medias,
    current
})=>{
    return(
    <HorizontalScroll
        maxWidth="100%"
        overflowXScroll={true}
        overflowYScroll={false}
        className="d-flex flex-row align-items-center justify-content-start mt-3"
    >
        {
            medias?.map((a,i)=>(
                a.type === "image" ? <Image selected={current===i} key={i} image={a.unique} onClick={()=>onClick(i)}/> : 
                a.type === "audio" ? <Audio selected={current===i} key={i} duration={a.duration} onClick={()=>onClick(i)} /> :
                a.type === "file" ? <File name={a?.name} selected={current===i} key={i} onClick={()=>onClick(i)} /> :
                a.type === "video" ? <Video selected={current===i} key={i} duration={a.duration} unique={a.video_qualities[0]?.videoHash} onClick={()=>onClick(i)} /> : null
            ))
        }
    </HorizontalScroll>
)}