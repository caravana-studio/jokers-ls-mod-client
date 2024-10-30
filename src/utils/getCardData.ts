import { MODIFIER_CARDS_DATA } from "../data/modifiers";
import { PACKS_DATA } from "../data/packs";
import { RAGE_CARDS_DATA } from "../data/rageCards";
import { SPECIAL_CARDS_DATA } from "../data/specialCards";
import { NEON_CARDS_DATA, TRADITIONAL_CARDS_DATA } from "../data/traditionalCards";
import { CardTypes } from "../enums/cardTypes";
import { Card } from "../types/Card";
import { CardData } from "../types/CardData";

export const getCardData = (card: Card, isPack: boolean = false): CardData => {
  const cardId = Number(card.card_id);
  const isRage = cardId > 400 && cardId < 500;

  if (isPack && cardId in PACKS_DATA) {
    return {...PACKS_DATA[cardId], type: CardTypes.PACK};
  } else if (isRage && cardId in RAGE_CARDS_DATA) {
    return {...RAGE_CARDS_DATA[cardId], type: CardTypes.RAGE};
  } else if (card.isSpecial && cardId in SPECIAL_CARDS_DATA) {
    return {...SPECIAL_CARDS_DATA[cardId], type: CardTypes.SPECIAL};
  } else if (card.isModifier && cardId in MODIFIER_CARDS_DATA) {
    return {...MODIFIER_CARDS_DATA[cardId], type: CardTypes.MODIFIER};
  } else if (cardId in TRADITIONAL_CARDS_DATA) {
    return {...TRADITIONAL_CARDS_DATA[cardId], type: CardTypes.COMMON};
  } else if (cardId in NEON_CARDS_DATA) {
    return {...NEON_CARDS_DATA[cardId], type: CardTypes.NEON};
  }else {
    return {
      name: "",
      description: "",
      type: CardTypes.NONE,
    };
  }
};
