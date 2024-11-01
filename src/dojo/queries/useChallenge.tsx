import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";

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
  const challengeResult = useComponentValue(Challenge, entityId);
  const challenges = (challengeResult?.active_ids ?? []).map((challenge) => {
    const id = challenge[0] ? Number((challenge[0] as any)?.value) : 0;
    const completed = challenge[1]
      ? Boolean((challenge[1] as any)?.value)
      : false;
    return { id, completed };
  });

  return challenges;
};
