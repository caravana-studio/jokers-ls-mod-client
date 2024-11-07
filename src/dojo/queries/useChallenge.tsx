import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { getChallegePlayer } from "./getChallengePlayer";
import { useEffect, useState } from "react";
import { ChallengePlayer } from "../typescript/models.gen";

export const useChallengePlayer = () => {
  const {
    setup: { client },
  } = useDojo();

  const [challengePlayer, setChallengePlayer] = useState<
    ChallengePlayer | undefined
  >(undefined);

  useEffect(() => {
    fetchChallengePlayer();
  }, []);

  const fetchChallengePlayer = () => {
    getChallegePlayer(client).then((challemgePlayer) => {
      setChallengePlayer(challemgePlayer);
    });
  };

  return challengePlayer;
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
