import { store } from "../../redux/store";



export const addUsers = ({users})=>store.dispatch({
    type:"USERS_ADD",
    users
})