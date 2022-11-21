export const addLoading = (state, action) => {
  const commentIndex = state.comments.findIndex((e) => e.id === action.id),
    meantComment = state.comments[commentIndex];
  return {
    ...state,
    comments: [
      ...state.comments.slice(0, commentIndex),
      {
        ...meantComment,
        loadings: [
          ...(Array.isArray(meantComment.loadings)
            ? meantComment.loadings
            : []),
          action.data,
        ],
      },
      ...state.comments.slice(commentIndex + 1),
    ],
  };
};
