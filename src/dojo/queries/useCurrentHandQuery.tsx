import { useDojo } from "../useDojo";
import { getLSGameId } from "../utils/getLSGameId";

export const useCurrentHandQuery = async () => {
  const {
    setup: { client },
    account,
  } = useDojo();

  const result = await client.player_system.get_player_current_hand({
    account,
    game_id: getLSGameId(),
  });
  console.log("result from useCurrentHandQuery", result);
  return result;
};
