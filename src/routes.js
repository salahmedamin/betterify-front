export const routes = {
    action: {
        posts:{
            react: "posts/react/",
            comment: "posts/comment/"
        }
    },
    get:{
        posts:{
            feedPosts: "posts/feedPosts/",
            similar: "posts/similar/",
            reacts: "posts/reacts/",
            searchReacts: "posts/searchReacts/",
            profilePosts: "posts/profilePosts/",
            edits: "posts/edits/",
            comments: "posts/comments/",
        },
        comments:{
            edits: "comments/edits/",
            reacts: "comments/reacts/",
            replies: "comments/replies/"
        },
        user: {
            mention: "user/mention/"
        }
    }
}