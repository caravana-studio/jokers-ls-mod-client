import { getLSGameId } from "../utils/getLSGameId";

export const getSpecialCard = async (
  client: any
): Promise<{ card_id: number; idx: number }[]> => {
  const result = await client.player_system.get_current_special_cards({
    game_id: getLSGameId(),
  });

  return (result as any).map((card: any) => {
    const card_id = parseInt(card.effect_card_id);
    const idx = parseInt(card.idx);
    return { card_id, idx };
  });
};