import { useEffect, useState } from "react";
import { SortBy } from "../../enums/sortBy";
import { Card } from "../../types/Card";
import { sortCards } from "../../utils/sortCards";
import { useDojo } from "../useDojo";
import { getCurrentHand } from "./getCurrentHand";

export const useCurrentHand = (sortBy: SortBy) => {
  const {
    setup: { client },
  } = useDojo();

  const [hand, setHand] = useState<Card[]>([]);

  useEffect(() => {
    fetchHand();
  }, []);

  useEffect(() => {
    setAndSortHand(hand);
  }, [sortBy]);

  const setAndSortHand = (cards: Card[]) => {
    setHand(sortCards(cards, sortBy));
  };

  const fetchHand = () => {
    getCurrentHand(client).then((dojoCards) => {
      const cards: Card[] = dojoCards
        // filter out null cards (represented by card_id 9999)
        .filter((card: any) => card?.card_id !== 9999)
        .map((dojoCard: any) => {
          return {
            ...dojoCard,
            img: `${dojoCard?.card_id}.png`,
            isModifier: dojoCard?.card_id >= 600 && dojoCard?.card_id <= 700,
            idx: dojoCard?.idx,
            id: dojoCard?.idx.toString(),
          };
        });

      const anyUndefined = cards.some((card) => card.img === "undefined.png");

      setAndSortHand(anyUndefined ? [] : cards);
    });
  };

  return { hand, setHand: setAndSortHand, fetchHand };
};
