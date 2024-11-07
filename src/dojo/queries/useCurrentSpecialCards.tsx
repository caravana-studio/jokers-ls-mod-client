import { useEffect, useState } from "react";
import { useDojo } from "../useDojo";
import { Card } from "../../types/Card";
import { getSpecialCard } from "./getSpecialCard";
import { sortCards } from "../../utils/sortCards";

export const useCurrentSpecialCards = (specialCards: any, setSpecialCards: any) => {
  const {
    setup: { client },
  } = useDojo();

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

      // console.log("fetchSpecialCards: specialCards", cards);
      setSpecialCards(cards);
    });
  };
  return specialCards;
};