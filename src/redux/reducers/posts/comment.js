export const commentOnPost = (state, action) => {
  const postIndex = state.list.findIndex((e) => e.id === action.id),
    post = state.list[postIndex];
  const commentRepliedToIndex = action.replyToID
      ? state.comments.findIndex((e) => e.id === action.replyToID)
      : undefined,
    commentRepliedTo = commentRepliedToIndex
      ? state.comments[commentRepliedToIndex]
      : undefined;
  if (commentRepliedTo) {
    return {
      ...state,
      list: [
        ...state.list.slice(0, postIndex),
        {
          ...post,
          commentsCount:
            post.id === action.id
              ? action.commentType === "add"
                ? post.commentsCount + 1
                : post.commentsCount - 1
              : post.commentsCount,
          hasCommented:
            post.id === action.id && action.commentType === "add"
              ? true
              : post.hasCommented,
        },
        ...state.list.slice(postIndex + 1),
      ],
      comments: [
        ...state.comments.slice(0, commentRepliedToIndex),
        {
          ...commentRepliedTo,
          repliesCount: commentRepliedTo.repliesCount + 1,
        },
        ...state.comments.slice(commentRepliedToIndex + 1),
      ],
      replies: [...state.replies, action.comment],
    };
  } else
    return {
      ...state,
      list: [
        ...state.list.slice(0, postIndex),
        {
          ...post,
          commentsCount:
            action.commentType === "add"
              ? post.commentsCount + 1
              : post.commentsCount - 1,
          hasCommented: action.commentType === "add" ? true : post.hasCommented,
        },
        ...state.list.slice(postIndex + 1),
      ],
      comments: [...state.comments, action.comment],
    };
};
