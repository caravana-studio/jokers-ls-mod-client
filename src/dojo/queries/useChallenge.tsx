import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { useEffect, useState } from "react";

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
    setup: { client },
  } = useDojo();

  const [challenges, setChallenges] = useState<
    { id: number; completed: boolean }[]
  >([]);

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = () => {
    getChallenges(client).then((newChallenges) => {
      // console.log("challenge: ", newChallenges);

      setChallenges(newChallenges);
    });
  };

  return challenges;
};

export const getChallenges = async (
  client: any
): Promise<{ id: number; completed: boolean }[]> => {
  const result = await client.player_system.get_challenge({
    game_id: getLSGameId(),
  });

  return (result.active_ids as any).map((challenge: any) => {
    const id = challenge[0] ? Number((challenge[0] as number)?.valueOf()) : 0;

    console.log(challenge[1]);

    const completed = challenge[1]
      ? Boolean((challenge[1] as boolean)?.valueOf())
      : false;
    return { id, completed };
  });
};
