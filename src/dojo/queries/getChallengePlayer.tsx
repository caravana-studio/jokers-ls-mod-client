import { getLSGameId } from "../utils/getLSGameId";

export const getChallegePlayer = async (
  client: any
): Promise<{ game_id: number; discards: number; plays: number }> => {
  const result = await client.player_system.get_challenge_player({
    game_id: getLSGameId(),
  });

  const game_id = parseInt(result.game_id);
  const discards = parseInt(result.discards);
  const plays = parseInt(result.plays);

  return { game_id, discards, plays };
};
