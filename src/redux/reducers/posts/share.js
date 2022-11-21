export const sharePost = (state, action) => {
  return {
    ...state,
    list: [
      ...state.list.map((a) => ({
        hasShared: a.id === action.id,
        ...a,
      })),
    ],
  };
};
