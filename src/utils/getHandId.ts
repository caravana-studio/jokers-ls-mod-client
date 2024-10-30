import { Card } from "../types/Card";

export const getHandId = (cards: Card[]): string => {
  // return a string that concatenates the hand card ids
  return cards.map((card) => card.card_id).join("");
};
