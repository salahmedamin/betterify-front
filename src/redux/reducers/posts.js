export const posts = (
  state = {
    list: [] /**data */,
    comments: [],
    replies: [],
    showReactions: [],
  },
  action
) => {
  switch (action.type) {
    case "POSTS_SET":
      return {
        ...state,
        list: action.data,
      };

    case "POSTS_FOLLOW_OWNER":
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

    case "POSTS_EDIT":
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

    case "POSTS_OVERLAY":
      return {
        ...state,
        list: state.list.map((a) => ({
          ...a,
          overlay:
            a.id === action.id
              ? !action.hide
                ? action.overlay
                : undefined
              : a?.overlay,
        })),
      };

    case "POSTS_DELETE":
      return {
        ...state,
        list: [...state.list.filter((a) => a.id !== action.id)],
      };

    case "POSTS_PRIVACY":
      return {
        ...state,
        list: [
          ...state.list.map((a) => ({
            privacyType:
              a.id === action.id ? action.privacyType : a.privacyType,
            onlyFollowers:
              a.id === action.id ? action.privacyType : a.onlyFollowers,
            onlyFollowersAndFollowed:
              a.id === action.id
                ? action.privacyType
                : a.onlyFollowersAndFollowed,
            usersThatCanSee:
              a.id === action.id ? action.usersThatCanSee : a.usersThatCanSee,
            ...a,
          })),
        ],
      };

    case "POSTS_REACT":
      return {
        ...state,
        list: [
          ...state.list.map((a) => ({
            react: {
              ownReaction: action.emoji,
              ...a.react,
            },
            ...a,
          })),
        ],
      };

    case "POSTS_SHARE":
      return {
        ...state,
        list: [
          ...state.list.map((a) => ({
            hasShared: a.id === action.id,
            ...a,
          })),
        ],
      };

    case "POSTS_COMMENT": //when user comments on post
      return {
        ...state,
        list: [
          ...state.list.map((a) => ({
            commentsCount:
              a.id === action.id
                ? action.type === "add"
                  ? a.commentsCount + 1
                  : a.commentsCount - 1
                : a.commentsCount,
            hasCommented:
              a.id === action.id && action.type === "add"
                ? true
                : a.hasCommented,
            ...a,
          })),
        ],
      };

    case "POST_EMPTY_COMMENTS":
      return {
        ...state,
        comments: state.comments.filter((a) => a.postID !== action.id),
      };

    case "COMMENT_ADD_LOADING":
      return {
        ...state,
        comments: state.comments.map((a) =>
          action.id === a.id
            ? {
                ...a,
                loadings: [
                  ...(Array.isArray(a.loadings) ? a.loadings : []),
                  action.data,
                ],
              }
            : a
        ),
      };

    case "COMMENT_DELETE_LOADING":
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

    case "POST_GET_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...(action.comments || [])],
      };

    case "COMMENTS_REPLIES_INDEX_INC":
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

    case "COMMENTS_EMPTY_REPLIES":
      return {
        ...state,
        replies: state.replies.filter(
          (a) => a.replyToID !== action.commentID && a.postID !== action.postID
        ),
      };

    case "COMMENTS_HIDE_REPLIES":
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

    case "COMMENTS_SET_REPLIES":
      return {
        ...state,
        replies: [...state.replies, ...action.data],
      };

    case "POSTS_SET_SHOW_REACTIONS":
      return {
        ...state,
        showReactions: action.value
          ? [...state.showReactions, action.id]
          : state.showReactions.filter((a) => a !== action.id),
      };

    case "POSTS_SET_REACTION":
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
                    reactionFromAction === ownReaction
                      ? undefined
                      : action.react,

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

    default:
      return state;
  }
};
