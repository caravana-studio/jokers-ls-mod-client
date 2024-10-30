import { NumericCardTypes } from "../enums/cardTypes";
import { Card } from "../types/Card";

export const getCardType = (card: Card) => {
  if (card.isModifier) {
    return NumericCardTypes.MODIFIER;
  } else if (card.isSpecial) {
    return NumericCardTypes.SPECIAL;
  } else {
    return NumericCardTypes.COMMON;
  }
};
