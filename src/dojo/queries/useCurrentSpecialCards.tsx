import {
  Component,
  Entity,
  getComponentValue
} from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useMemo } from "react";
import { Card } from "../../types/Card.ts";
import { useDojo } from "../useDojo.tsx";
import { useGame } from "./useGame.tsx";

const getSpecialCard = (
  gameId: number,
  index: number,
  component: Component
) => {
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(index),
  ]) as Entity;
  const specialCard = getComponentValue(component, entityId);
  const card_id = specialCard?.effect_card_id ?? 0;

  return {
    card_id,
    isSpecial: true,
    id: card_id?.toString(),
    idx: index ?? 0,
    img: `${card_id}.png`,
    temporary: specialCard?.is_temporary,
    remaining: specialCard?.remaining,
  };
};

export const useCurrentSpecialCards = () => {
  const {
    setup: {
      clientComponents: { CurrentSpecialCards },
    },
  } = useDojo();
  const game = useGame();

  const gameId = game?.id ?? 0;

  const specialCardsLength = game?.len_current_special_cards ?? 0;

  const specialCards: Card[] = useMemo(() => {
    const specialCardsIds = Array.from(
      { length: specialCardsLength },
      (_, index) => index
    );
    return specialCardsIds.map((index) =>
      getSpecialCard(gameId, index, CurrentSpecialCards)
    );
  }, [specialCardsLength, game?.state]);

  return specialCards;
};
