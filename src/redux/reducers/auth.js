export const auth =
(
    state={
        isLogged: true,
        username: "monstronix"
    },
    action
)=>{
    switch(action.type){
        case "SET_LOGGED_IN":
            return {
                isLogged: true,
                ...action.data
            }
        case "SET_LOGGED_OUT":
            return {
                isLogged: false
        }
        default:
            return state
    }
}