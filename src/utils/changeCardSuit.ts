import {
  TRADITIONAL_CARDS_DATA,
  NEON_CARDS_DATA,
} from "../data/traditionalCards";
import { Cards } from "../enums/cards";
import { Suits } from "../enums/suits";
import { CardDataMap } from "../types/CardData";

function findKeyByCardAndSuit(
  map: CardDataMap,
  card: Cards,
  suit: Suits,
  isNeon: boolean
): number | undefined {
  for (const key in map) {
    if (map.hasOwnProperty(key)) {
      const cardData = map[key];
      const keyNumber = parseInt(key, 10);
      if (
        cardData.card === card &&
        cardData.suit === suit &&
        ((isNeon && keyNumber >= 200) || (!isNeon && keyNumber < 200))
      ) {
        return keyNumber;
      }
    }
  }
  return undefined;
}

export const changeCardSuit = (card_id: number, newSuit: Suits): number => {
  const isNeon = card_id >= 200;
  const { card } = isNeon
    ? NEON_CARDS_DATA[card_id]
    : TRADITIONAL_CARDS_DATA[card_id];

  return isNeon
    ? findKeyByCardAndSuit(NEON_CARDS_DATA, card!, newSuit, isNeon) ?? card_id
    : findKeyByCardAndSuit(TRADITIONAL_CARDS_DATA, card!, newSuit, isNeon) ??
        card_id;
};
