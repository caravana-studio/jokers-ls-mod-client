import { useComponentValue } from "@dojoengine/react";
import { Entity } from "@dojoengine/recs";
import { getEntityIdFromKeys } from "@dojoengine/utils";
import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";
import { useEffect, useState } from "react";

export const useGetRewards = () => {
  const {
    setup: { client },
  } = useDojo();

  const [rewardIds, setRewardIds] = useState<{ id: number }[]>([]);

  useEffect(() => {
    fetchRewardIds();
  }, []);

  const fetchRewardIds = () => {
    getRewards(client).then((reward) => {
      setRewardIds(reward);
    });
  };

  return { rewardIds, setRewardIds, fetchRewardIds };
};

export const getRewards = async (client: any): Promise<{ id: number }[]> => {
  const result = await client.player_system.get_reward({
    game_id: getLSGameId(),
  });

  return (result.rewards_ids as any).map((reward_id: any) => {
    const id = reward_id ? Number((reward_id as number)?.valueOf()) : 0;
    return { id };
  });
};
