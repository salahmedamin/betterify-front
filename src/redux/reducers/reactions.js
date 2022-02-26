export const mode =
(
    state=[],
    action
)=>{
    switch(action.type){
        case "SET_REACTIONS":
            return [...state, action.reactions]
        default:
            return state
    }
}