import { CardTypes } from "../../enums/cardTypes";
import { getCardTypeFromCardId } from "./getCardTypeFromCardId";

export const getCardFromCardId = (cardId: number, index: number) => {
  const cardType = getCardTypeFromCardId(cardId);
  return {
    isModifier: cardType === CardTypes.MODIFIER,
    isSpecial: cardType === CardTypes.SPECIAL,
    card_id: cardId,
    id: cardId.toString() ?? "",
    idx: index,
    img: `${cardId}.png`,
  };
};
