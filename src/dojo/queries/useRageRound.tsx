import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { useGame } from "./useGame";

export const useRageRound = () => {
  const {
    setup: {
      clientComponents: { RageRound },
    },
  } = useDojo();
  const game = useGame();

  const gameId = game?.id ?? 0;

  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  const rageRound = useComponentValue(RageRound, entityId);
  return rageRound;
};

export const useRageCards = () => {
  const rageRound = useRageRound();
  if (!rageRound || !rageRound.is_active || !rageRound.active_rage_ids) {
    return [];
  }
  const dojoRageCards = rageRound?.active_rage_ids.map((c, index) => {
    const card_id = c && (c as any).value;
    return {
      card_id,
      isSpecial: false,
      id: card_id?.toString(),
      idx: index ?? 0,
      img: `rage/${card_id}.png`,
    };
  });

  return dojoRageCards ?? [];
};
