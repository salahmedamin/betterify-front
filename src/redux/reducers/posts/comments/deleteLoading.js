export const deleteLoading = (state, action) => {
  return {
    ...state,
    comments: state.comments.map((a) =>
      action.id === a.id
        ? {
            ...a,
            loadings: Array.isArray(a.loadings)
              ? a.loadings.filter((a) => a !== action.data)
              : [],
          }
        : a
    ),
  };
};
