export const groups = [
  {
    name: "Date",
    id: "date",
  },
  {
    name: "Reactions",
    id: "reactions",
  },
  {
    name: "Replies",
    id: "replies",
  },
];
export const commentFilters = [
  {
    name: "Newest",
    image: "/images/general/growth.svg",
    order: "desc",
    groupID: "date"
  },
  {
    name: "Oldest",
    image: "/images/general/decline.svg",
    order: "asc",
    groupID: "date"
  },
  {
    name: "Highest",
    image: "/images/general/growth.svg",
    value: "up",
    order: "desc",
    groupID:"reactions"
  },
  {
    name: "Lowest",
    image: "/images/general/decline.svg",
    order: "asc",
    groupID:"reactions"
  },
  {
    name: "Highest",
    image: "/images/general/growth.svg",
    value: "up",
    order: "desc",
    groupID: "replies"
  },
  {
    name: "Lowest",
    image: "/images/general/decline.svg",
    order: "asc",
    groupID: "replies"
  },
];
