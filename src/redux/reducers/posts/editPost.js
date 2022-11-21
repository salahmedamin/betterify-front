export const editPost = (state, action) => {
  return {
    ...state,
    list: [
      ...state.list.map((a) => ({
        edits:
          a.id === action.id
            ? [
                {
                  text: action.text,
                },
                ...a.edits,
              ]
            : a.edits,
        hasEdits: true,
        ...a,
      })),
    ],
  };
};
