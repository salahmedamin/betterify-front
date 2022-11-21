export const incrementCommentRepliesIndex = (state, action) => {
  return {
    ...state,
    comments: state.comments.map((a) =>
      a.id === action.id
        ? {
            ...a,
            showReplies: true,
            repliesIndex: a.repliesIndex + 1,
          }
        : a
    ),
  };
};
