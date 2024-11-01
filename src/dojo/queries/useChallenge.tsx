import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";

export const useChallengePlayer = () => {
  const {
    setup: {
      clientComponents: { ChallengePlayer },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return useComponentValue(ChallengePlayer, entityId);
};

export const useChallenge = () => {
  const {
    setup: {
      clientComponents: { Challenge },
    },
  } = useDojo();
  const gameId = getLSGameId();
  const entityId = getEntityIdFromKeys([BigInt(gameId)]) as Entity;
  return useComponentValue(Challenge, entityId);
};
