export const hideReplies = (state, action) => {
  return {
    ...state,
    comments: state.comments.map((a) =>
      a.id === action.id
        ? {
            ...a,
            showReplies: false,
            repliesIndex: -1,
          }
        : a
    ),
  };
};
