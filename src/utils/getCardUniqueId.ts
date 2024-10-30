import { Card } from "../types/Card";

const getCardType = (card: Card | undefined) => {
  return card?.isModifier
    ? "modifier"
    : card?.isSpecial
      ? "special"
      : "regular";
};

export const getCardUniqueId = (card: Card | undefined) => {
  const cardType = getCardType(card);
  return `${cardType}-${card?.id}`;
};
