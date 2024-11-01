import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { Entity } from "@dojoengine/recs";
import { useComponentValue } from "@dojoengine/react";

export const useBeast = () => {
  const {
    setup: {
      clientComponents: { Beast },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  const data = useComponentValue(Beast, entityId);
  return data;
};

export const useBeastPlayer = () => {
  const {
    setup: {
      clientComponents: { PlayerBeast },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  const data = useComponentValue(PlayerBeast, entityId);
  return data;
};

export const useGameModeBeast = () => {
  const {
    setup: {
      clientComponents: { GameModeBeast },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return useComponentValue(GameModeBeast, entityId);
};
