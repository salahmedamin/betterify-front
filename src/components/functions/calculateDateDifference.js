export const calculateDateDifference = (date1, date2) => {
  const time1 = date1.getTime();
  const time2 = date2.getTime();
  const diff = Math.abs(time1 - time2) / 1000,
    second = 1,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = day * 30.5,
    year = month * 12;

  return diff / year > 1
    ? `${Math.floor(diff / year)} yr${Math.floor(diff / year) > 1 ? "s" : ""}`
    : diff / month > 1
    ? `${Math.floor(diff / month)} mo${Math.floor(diff / month) > 1 ? "s" : ""}`
    : diff / week > 1
    ? `${Math.floor(diff / week)} wk${Math.floor(diff / week) > 1 ? "s" : ""}`
    : diff / day > 1
    ? `${Math.floor(diff / day)} day${Math.floor(diff / day) > 1 ? "s" : ""}`
    : diff / hour > 1
    ? `${Math.floor(diff / hour)} hr${Math.floor(diff / hour) > 1 ? "s" : ""}`
    : diff / minute > 1
    ? `${Math.floor(diff / minute)} min${
        Math.floor(diff / minute) > 1 ? "s" : ""
      }`
    : `${Math.floor(diff / second)} sec${
        Math.floor(diff / second) > 1 ? "s" : ""
      }`;
};
