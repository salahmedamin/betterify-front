export const mode = (state = "dark", action) => {
  switch (action.type) {
    case "SWITCH_MODE":
      return state === "dark" ? "light" : "dark";
    default:
      return state;
  }
};
