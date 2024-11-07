import { useEffect, useState } from "react";
import { useDojo } from "../useDojo";
import { Card } from "../../types/Card";
import { getSpecialCard } from "./getSpecialCard";

export const useCurrentSpecialCards = () => {
  const {
    setup: { client },
  } = useDojo();
  const [specialCards, setSpecialCards] = useState<Card[]>([]);

  useEffect(() => {
    fetchSpecialCards();
  }, []);

  const fetchSpecialCards = () => {
    getSpecialCard(client).then((dojoCards) => {
      const cards: Card[] = dojoCards
        .map((dojoCard: any) => {
          return {
            ...dojoCard,
            img: `${dojoCard?.card_id}.png`,
            isModifier: false,
            isSpecial: true,
            idx: dojoCard?.idx,
            id: dojoCard?.idx.toString(),
          };
        });

      setSpecialCards(cards);
    });
  };
  return {specialCards, setSpecialCards, fetchSpecialCards};
};