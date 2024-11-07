import { getLSGameId } from "../utils/getLSGameId";

export const getBlisterPackResult = async (
  client: any
): Promise<{ game_id: number, cards_picked: boolean, cards: number[] }> => {
  const result = await client.player_system.get_blister_pack_result({
    game_id: getLSGameId(),
  });
  
    return { game_id: result.game_id, cards_picked: result.cards_picked, cards: result.cards } 
};
