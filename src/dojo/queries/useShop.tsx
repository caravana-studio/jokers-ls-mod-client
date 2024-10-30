import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";

export const useShop = () => {
  const {
    setup: {
      clientComponents: { Shop },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return useComponentValue(Shop, entityId);
};
