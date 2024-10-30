import {
  Component,
  Entity,
  getComponentValue
} from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { SortBy } from "../../enums/sortBy";
import { Card } from "../../types/Card";
import { sortCards } from "../../utils/sortCards";
import { useDojo } from "../useDojo";
import { useGame } from "./useGame";

const getCard = (gameId: number, index: number, entity: Component) => {
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(index),
  ]) as Entity;
  return getComponentValue(entity, entityId);
};

export const useCurrentHand = (sortBy: SortBy) => {
  const {
    setup: {
      clientComponents: { CurrentHandCard },
    },
  } = useDojo();

  const game = useGame();

  if (!game) return [];

  const handSize = game.len_hand;
  const dojoCards = [];

  for (let i = 0; i < handSize; i++) {
    dojoCards.push(getCard(game.id ?? 0, i, CurrentHandCard));
  }

  const cards: Card[] = dojoCards
    // filter out null cards (represented by card_id 9999)
    .filter((card) => card?.card_id !== 9999)
    .map((dojoCard) => {
      return {
        ...dojoCard,
        img: `${dojoCard?.card_id}.png`,
        isModifier: dojoCard?.card_id >= 600 && dojoCard?.card_id <= 700,
        idx: dojoCard?.idx,
        id: dojoCard?.idx.toString(),
      };
    });

  const sortedCards = sortCards(cards, sortBy);
  return sortedCards;
};
