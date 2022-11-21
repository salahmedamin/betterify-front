import { useSelector } from "react-redux";

export const noHooksColors = (mode) => {
  return {
    purple: "#654DDF",
    yellow: "#FFCC4D",
    red: "#FF0000",
    whiteBlue: "#6E757E",
    gray: mode === "dark" ? "#373F51" : "#17191b",
    whiteningGrey: mode === "dark" ? "#17191b" : "#ffffff",
    magenta: "#C586EA",
    limeGreen: "#15b79c",
    white: mode === "dark" ? "#ffffff" : "#17191b",
    preWhite: "#434343",
    body: mode === "dark" ? "#0D1321" : "#ffffff",
    black: mode === "dark" ? "#17191b" : "#ffffff",
    blue: "#2c76d6",
    coolors: {
      orange: "rgb(255, 95, 92)",
      peach: "rgb(237, 206, 171)",
      green: "#15b79c",
      charocal: "#373f51",
      blueSky: "#118AB2",
      purple: "#A379C9",
    },
  };
};

export const useColors = () => {
  const mode = useSelector((s) => s.mode);
  return {
    purple: "#654DDF",
    yellow: "#FFCC4D",
    red: "#FF0000",
    whiteBlue: "#6E757E",
    gray: mode === "dark" ? "#373F51" : "#17191b",
    magenta: "#C586EA",
    limeGreen: "#15b79c",
    white: mode === "dark" ? "#ffffff" : "#17191b",
    preWhite: "#434343",
    body: mode === "dark" ? "#0D1321" : "#ffffff",
    black: mode === "dark" ? "#17191b" : "#ffffff",
    blue: "#2c76d6",
    coolors: {
      orange: "rgb(255, 95, 92)",
      peach: "rgb(237, 206, 171)",
      green: "#15b79c",
      charocal: "#373f51",
      blueSky: "#118AB2",
      purple: "#A379C9",
    },
  };
};
