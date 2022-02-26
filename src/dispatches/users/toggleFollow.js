import { store } from "../../redux/store";



export const toggleFollow = ({id})=>store.dispatch({
    type:"USERS_FOLLOW_TOGGLE",
    id
})