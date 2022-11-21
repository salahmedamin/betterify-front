import { randomFromArray } from "../../../functions/randomFromArray";
import { reactionsBg } from "../../Reactions/reactions_list";

export const generateRandomReactionIcon = () => {
  return randomFromArray(reactionsBg);
};
