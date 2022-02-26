import { store } from "../../redux/store";



export const toggleFavorite = ({id})=>store.dispatch({
    type:"USERS_FAVORITE_TOGGLE",
    id
})