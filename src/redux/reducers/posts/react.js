export const reactOnPost = (state, action) => {
  const meantPost = state.list.find((a) => a.id === action.id);
  const ownReaction = meantPost?.react?.ownReaction?.toLowerCase();
  const reactionFromAction = action.react?.toLowerCase();
  const hasReacts = meantPost?.react?.types?.length > 0;
  const hasReactorAlready = meantPost?.react?.types?.find(
    (a) => a.emoji === action.react.toLowerCase()
  ); //checking if reaction from action object has some reactors already
  return {
    ...state,
    list: state.list.map((a) =>
      a.id === action.id
        ? {
            ...a,
            react: {
              ...a.react,

              ownReaction:
                reactionFromAction === ownReaction ? undefined : action.react,

              types: !hasReacts
                ? [
                    //if no reactions at all, add it, simply 🤷‍♀️
                    {
                      emoji: action.react,
                      total: 1,
                    },
                  ]
                : !hasReactorAlready
                ? //if reaction doesn't have reactors already, add it,
                  //then, if user's reaction already exists, remove it
                  [
                    ...a.react?.types?.map((m) =>
                      m.emoji === ownReaction
                        ? {
                            ...m,
                            total: m.total - 1,
                          }
                        : m
                    ),
                    {
                      emoji: action.react,
                      total: 1,
                    },
                  ].filter((a) => a.total > 0)
                : //must check,
                  //if his reaction, is the only one when he changed it to another
                  //then remove it
                  a.react?.types
                    ?.map((x) =>
                      x.emoji === reactionFromAction
                        ? {
                            ...x,
                            total:
                              ownReaction === x.emoji
                                ? x.total - 1
                                : x.total + 1,
                          }
                        : x.emoji === ownReaction &&
                          ownReaction !== reactionFromAction
                        ? {
                            ...x,
                            total: x.total - 1,
                          }
                        : x
                    )
                    .filter((e) => e?.total > 0),
            },
          }
        : a
    ),
  };
};
