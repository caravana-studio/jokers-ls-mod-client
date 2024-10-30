import { Suits } from "../enums/suits";
import { useGameContext } from "../providers/GameProvider";
import { Card } from "../types/Card";
import { getCardData } from "../utils/getCardData";

const getSilentSuit = (cardId: number) => {
  switch (cardId) {
    case 401:
      return Suits.HEARTS;
    case 402:
      return Suits.CLUBS;
    case 403:
      return Suits.DIAMONDS;
    case 404:
      return Suits.SPADES;
    case 405:
      return Suits.JOKER;
    default:
      return "None";
  }
};

export const useIsSilent = (card: Card) => {
  const { isRageRound, rageCards } = useGameContext();
  const { suit: idSuit } = getCardData(card, false);
  const suit = card.suit ?? idSuit;
  const isSilent = rageCards.some((rageCard) => {
    return getSilentSuit(rageCard.card_id!) === suit;
  });
  return isRageRound && isSilent;
};
