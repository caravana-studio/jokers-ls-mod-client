import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useMemo } from "react";
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
  const challengeIds = useMemo(
    () =>
      (challengeResult?.active_ids ?? []).map(
        (id) => id && Number((id as any)?.value)
      ),
    [challengeResult?.active_ids]
  );
  return challengeIds;
};
