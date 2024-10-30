import { Card } from "../types/Card";
import { checkHand } from "../utils/checkHand";

export const testCheckHand = (
  cards: Card[],
  specialCards?: Card[],
  preSelectedModifiers?: { [key: number]: number[] }
) => {
  const newCards = cards.map((c, index) => ({ ...c, idx: index }));
  return checkHand(
    newCards,
    newCards.map((c) => c.idx),
    specialCards ?? [],
    preSelectedModifiers ?? []
  );
};
