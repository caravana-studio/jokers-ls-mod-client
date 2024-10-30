import { TRADITIONAL_CARDS_DATA } from "../data/traditionalCards";
import { SortBy } from "../enums/sortBy";
import { Card } from "../types/Card";

export const sortCards = (cards: Card[], sortBy: SortBy): Card[] => {
  return cards.sort((a, b) => {
    // First layer: isModifier and isSpecial
    if (a.isModifier !== b.isModifier) {
      return a.isModifier ? 1 : -1;
    }
    if (a.isSpecial !== b.isSpecial) {
      return a.isSpecial ? 1 : -1;
    }

    // Second layer
    // if sort by rank or card is modifier or special, sort by card_id
    if (sortBy === SortBy.SUIT || a.isModifier || a.isSpecial) {
      if (a.card_id !== undefined && b.card_id !== undefined) {
        if (a.card_id !== b.card_id) {
          return a.card_id - b.card_id;
        }
      }
    }
    // sort by rank
    const cardA =
      (a.card_id || a.card_id === 0) && TRADITIONAL_CARDS_DATA[a.card_id];
    const cardB =
      (b.card_id || b.card_id === 0) && TRADITIONAL_CARDS_DATA[b.card_id];
    if (cardA && cardB) {
      if (cardA.card !== cardB.card) {
        return (cardA.card ?? 0) - (cardB.card ?? 0);
      } else {
        return (a.card_id ?? 0) - (b.card_id ?? 0);
      }
    }

    return 0;
  });
};
