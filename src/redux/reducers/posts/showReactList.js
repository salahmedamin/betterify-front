export const showReactList = (state, action) => {
  return {
    ...state,
    showReactions: action.value
      ? [...state.showReactions, action.id]
      : state.showReactions.filter((a) => a !== action.id),
  };
};
