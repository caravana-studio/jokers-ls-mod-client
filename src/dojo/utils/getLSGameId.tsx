import { GAME_ID } from "../../constants/localStorage";

export const getLSGameId = () => {
  return Number(localStorage.getItem(GAME_ID)) ?? 0;
};
