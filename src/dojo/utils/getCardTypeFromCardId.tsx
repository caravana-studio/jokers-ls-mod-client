import { CardTypes } from "../../enums/cardTypes";

export const getCardTypeFromCardId = (cardId: number) => {
  if (cardId < 300) {
    return CardTypes.COMMON;
  } else if (cardId < 600) {
    return CardTypes.SPECIAL;
  } else {
    return CardTypes.MODIFIER;
  }
};
