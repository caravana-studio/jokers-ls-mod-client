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
    return getCardFromCardId(Number(cardId), index);
  });
};

export const useBlisterPackResult = () => {
  const {
    setup: { client },
  } = useDojo();

  const [blisterPackResult, setBlisterPackResult] = useState<Card[]>([]);

  useEffect(() => {
    fetchBlisterPackResult();
  }, []);

  const fetchBlisterPackResult = () => {
    getBlisterPackResult(client).then((result) => {
      const cards = getCards(result.cards ?? []).sort(sort);
      setBlisterPackResult(cards);
      return cards;
    });
  };
  return {blisterPackResult, setBlisterPackResult, fetchBlisterPackResult};
};
