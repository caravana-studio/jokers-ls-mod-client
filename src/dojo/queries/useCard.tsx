import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";

export const useCard = (gameId: number, cardIdx: number) => {
  const {
    setup: {
      clientComponents: { CurrentHandCard },
    },
  } = useDojo();
  const entityId = getEntityIdFromKeys([
    BigInt(gameId),
    BigInt(cardIdx),
  ]) as Entity;
  const card = useComponentValue(CurrentHandCard, entityId);
  return card;
};
