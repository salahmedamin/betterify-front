export const followOwner = (state, action) => {
  return {
    ...state,
    list: [
      ...state.list.map((a) => ({
        owner:
          a.id === action.id
            ? {
                ...a.owner,
                followed: action.follow,
              }
            : a.owner,
        ...a,
      })),
    ],
  };
};
