// const onlyUnique = (value, index, self) => {
//     return self.indexOf(value) === index;
//   }

export const users = (state = [], action) => {
  switch (action.type) {
    case "USERS_ADD":
      return [
        ...state,
        ...action.users
      ].reduce((tot, acc) =>{
        return !state?.some(a=>a.id === acc.id) && !tot?.some(a=>a.id === acc.id) ? tot = [...tot, acc] : tot
      }
        ,[]
    )
    case "USERS_FOLLOW_TOGGLE":
      return state.map((a) =>
        action.id === a.id
          ? {
              ...a,
              followed: ["pending",true].includes(a.followed) ? false : "pending",
              isFavorite: a.followed && a.isFavorite ? false : a.isFavorite
            }
          : a
      );
    case "USERS_FAVORITE_TOGGLE":
      return state.map((a) =>
        action.id === a.id
          ? {
              ...a,
              isFavorite: !a.isFavorite,
            }
          : a
      );
    default:
      return state;
  }
};
