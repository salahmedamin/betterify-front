import { combineReducers } from "redux";
import { posts } from "./reducers/posts"
import { auth } from "./reducers/auth"
import { mode } from "./reducers/mode"
import { users } from "./reducers/users"

export const reducer = combineReducers({
    posts,
    auth,
    mode,
    users
})