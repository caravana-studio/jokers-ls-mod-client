import { useEffect, useState } from "react";
import { BlisterPackResult } from "../typescript/models.gen";
import { useDojo } from "../useDojo";
import { Card } from "../../types/Card";
import { getBlisterPackResult } from "./getBlisterPackResult";
import { getCardFromCardId } from "../utils/getCardFromCardId";

const sort = (a: Card, b: Card) => {
  return (a.card_id ?? 0) - (b.card_id ?? 0);
};

const getCards = (cardIds: number[]) => {
  return cardIds.map((cardId, index) => {
    return getCardFromCardId(cardId, index);
  });
};

export const useBlisterPackResult = (blisterPackResult, setBlisterPackResult) => {
  const {
    setup: { client },
  } = useDojo();

  // const [blisterPackResult, setBlisterPackResult] = useState<Card[] | undefined>(undefined);

  useEffect(() => {
    fetchBlisterPackResult();
  }, []);

  const fetchBlisterPackResult = () => {
    getBlisterPackResult(client).then((result) => {
      const cards = getCards(result.cards);
      setBlisterPackResult(cards);
      return cards;
    });
  };
  return blisterPackResult;
};
