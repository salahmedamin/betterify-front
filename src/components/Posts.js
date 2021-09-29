import { useSelector } from "react-redux"
import LargeContainer from "./generalComps/LargeContainer"
import { Post } from "./Post"
export const Posts = ()=>{
    const posts = useSelector(state=>state.posts.list)
    
    return (
        <LargeContainer
            type="v"
            className="align-items-center w-100"
        >
            {
            posts.map((a,i)=><Post
                key={i}
                {...a}
            />)
            }
        </LargeContainer>
        )
}
    // return(
    // <div
    //     className={`p-3 pt-4`}
    //     style={{
    //         position:"relative",
    //         display: "inline-block",
    //         border: `1px solid ${colors.gray}`,
    //         borderRadius: 8
    //     }}
    // >
    //     <Topbar reactsTotal={PostSample.react.types.reduce((tot,acc)=>tot+=acc?.total,0)} commentsTotal={PostSample.commentsCount} name={PostSample.owner.firstName+" "+PostSample.owner.lastName} username={PostSample.owner.username} picture={PostSample.owner.profilePic}  />
    //     <Content medias={PostSample.multimedia} text={PostSample.content} tagged={PostSample.tagged_persons} />
    // </div>
