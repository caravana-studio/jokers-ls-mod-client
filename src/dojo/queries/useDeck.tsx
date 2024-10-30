import { useMemo } from "react";
import { Deck } from "../../types/Deck";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { useGame } from "./useGame";
import { useRound } from "./useRound";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { Entity } from "@dojoengine/recs";
import { useComponentValue } from "@dojoengine/react";

export const useDeck = (): Deck => {
  const {
    setup: {
      clientComponents: { GameDeck },
    },
  } = useDojo();
  const gameId = getLSGameId();

  const entityId = useMemo(
    () => getEntityIdFromKeys([BigInt(gameId)]) as Entity,
    [gameId]
  );

  const deck = useComponentValue(GameDeck, entityId);

  return {
    size: deck?.len || 0,
    currentLength: deck?.round_len || 0,
  };
};
