import { commentOnPost } from "./posts/comment";
import { addLoading } from "./posts/comments/addLoading";
import { deleteLoading } from "./posts/comments/deleteLoading";
import { hideReplies } from "./posts/comments/hideReplies";
import { incrementCommentRepliesIndex } from "./posts/comments/incrementRepliesIndex";
import { editPost } from "./posts/editPost";
import { followOwner } from "./posts/followOwner";
import { reactOnPost } from "./posts/react";
import { sharePost } from "./posts/share";
import { showReactList } from "./posts/showReactList";

export const posts = (
  state = {
    list: [],
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
      return followOwner(state, action);

    case "POSTS_EDIT":
      return editPost(state, action);

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

    // case "POSTS_REACT":
    //   return reactOnPost(state, action);

    case "POSTS_SHARE":
      return sharePost(state, action);

    case "POSTS_COMMENT": //when user comments on post
      return commentOnPost(state, action);

    case "POST_EMPTY_COMMENTS":
      return {
        ...state,
        comments: state.comments.filter((a) => a.postID !== action.id),
      };

    case "COMMENT_ADD_LOADING":
      return addLoading(state, action);

    case "COMMENT_DELETE_LOADING":
      return deleteLoading(state, action);

    case "POST_GET_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, ...(action.comments || [])],
      };

    case "COMMENTS_REPLIES_INDEX_INC":
      return incrementCommentRepliesIndex(state, action);

    case "COMMENTS_EMPTY_REPLIES":
      return {
        ...state,
        replies: state.replies.filter(
          (a) => a.replyToID !== action.commentID && a.postID !== action.postID
        ),
      };

    case "COMMENTS_HIDE_REPLIES":
      return hideReplies(state, action);

    case "COMMENTS_SET_REPLIES":
      return {
        ...state,
        replies: [...state.replies, ...action.data],
      };

    case "POSTS_SET_SHOW_REACTIONS":
      return showReactList(state, action);

    case "POSTS_SET_REACTION":
      return reactOnPost(state, action);
    default:
      return state;
  }
};
